/** @jsx jsx */
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../../components/base/src/theme';
import { getListUnverifiedMembers, postVerifiedMembers } from '../../../client/MemberClient'
import Card from 'components/deskstop/Card/Card'
import createStyles from './Validasi.styles';
import Table from '../../../components/base/src/components/Table/Table'

import { SelectOption } from '../../../components/base/src/staticPages/Register/Register.formHelper';

import ValidasiInternet from './ValidasiInternet'
import {
  Column,
  FormGroup,
  Input,
  Button,
  Row,
  Select,
  InputMask,
  Icon
} from 'kta-ui-components';


type Inputs = {
  fullname: string,
  id_card: string,
};

const Validasi: React.FC<any> = (props) => {

  const { register, handleSubmit } = useForm<Inputs>();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const [datas, setDatas] = useState([])

  const [options, setOptions] = React.useState<any | []>({
    showEntris: [
      { label: '10', value: '10', },
      { label: '25', value: '25', },
      { label: '50', value: '50', },
      { label: '100', value: '100', },
    ],
    tindakanMasal: [
      { label: 'Validasi', value: 'APPROVED', },
      { label: 'Hapus', value: 'DELETED', },
    ]
  })


  const [tindakanMasal, setTindankanMasal] = useState([])


  const [checkInternet, setCheckInternet] = React.useState<Boolean>(true)
  const [messageSubmit, setMessageSubmit] = useState<string>("default")
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const [inputName, setInputName] = useState<string>('')
  const [inputNik, setInputNik] = useState<string>('')
  const [perPage, setPerPage] = useState<number>(10)
  // const [sortCol, setSortCol] = useState<number>(1)
  // const [sortBy, setSortBy] = useState<number>(1)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)

  const [defaultValue, setDefaultValue] = useState<any>({
    showEntris: [{ label: '10', value: '10', }],
    tindakanMasal: null
  })

  const handleSelectOnChange = (e: any, type: string) => {
    console.log("handleSelectOnChange -> type", type)
    switch (type) {
      case 'showEntris':
        setPerPage(e.value)
        setDefaultValue({ ...defaultValue, showEntris: e })
        break;
      case 'tindakanMasal':
        setTindankanMasal(e.value)
        setDefaultValue({ ...defaultValue, tindakanMasal: e })
        break
    }
  }

  const columns = [
    {
      title: 'Tanggal Registrasi',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      sort: true,
    },
    {
      title: 'NIK',
      dataIndex: 'id_card',
      key: 'id_card',
      width: 200,
      sort: true,

    },
    {
      title: 'Nama Lengkap',
      dataIndex: 'fullname',
      key: 'fullname',
      width: 250,
      sort: true,
    },
    {
      title: 'Kode Registrasi',
      dataIndex: 'registration_number',
      key: 'registration_number',
      width: 200,
    },
    {
      title: 'Tindakan',
      dataIndex: 'id',
      key: 'id',
      width: 300,
      render: (id: any) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

            <a style={{ padding: '5px', backgroundColor: '#000', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => _handlePostMembers()}>
              <Icon name={'address-card'} />&nbsp;
                Lihat
            </a>
            <a style={{ padding: '5px', backgroundColor: '#47B920', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => _handlePostMembers(id, "APPROVED")}>
              <Icon name={'check-circle'} />&nbsp;
                Validasi
            </a>
            <a style={{ padding: '5px', backgroundColor: '#CE352D', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => _handlePostMembers(id, "DELETED")}>
              <Icon name={'trash'} />&nbsp;
                Hapus
            </a>

          </div>

        )
      }
    },
  ];

  const _handlePostMembers = async (...args: any) => {
    setIsTableLoading(true)
    const [id, status] = args
    const payload = {
      member_id: id,
      status: status
    }
    const { data } = await postVerifiedMembers(payload)
    if (data.message === "Success Approved Member") {
      setCheckInternet(false)
      setMessageSubmit("success")
      setIsTableLoading(false)
    } else {
      setMessageSubmit("failed")
      setCheckInternet(false)
    }

  }

  const getPayload = () => ({
    fullname: inputName || undefined,
    id_card: inputNik || undefined,
    page: page,
    limit: perPage,
    // sort_col: sortCol,
    // sort_by: sortBy,
  })

  const _getTableData = async () => {
    setIsTableLoading(true)
    const { data, meta } = await getListUnverifiedMembers(getPayload())
    setCurrentPage(meta.current_page)
    setTotal(meta.total)
    setLastPage(meta.last_page)
    setDatas(data)
    setIsTableLoading(false)
  }

  const handlePageChange = async (pageNum: number) => {
    setPage(pageNum)
  };

  const _handleSubmitSearch = (data: any) => {
    setInputName(data.fullname)
    setInputNik(data.id_card)
  }

  useEffect(() => {
    _getTableData()
  }, [])

  useEffect(() => {
    _getTableData()
  }, [page, perPage, inputName, inputNik])

  const Content = () => {
    return (
      <Fragment>
        <form onSubmit={handleSubmit(_handleSubmitSearch)} noValidate>
          <Row>
            <Column col={[12, 12, 4]}>
              {/* NIK */}
              <FormGroup>
                <Input
                  name="id_card"
                  innerRef={register}
                  type="text"
                  placeHolder="Cari Berdasarkan NIK"
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 4]}>
              {/* Nama Panggilan */}
              <FormGroup>
                <Input
                  innerRef={register}
                  name="fullname"
                  type="text"
                  placeHolder="Cari Berdasarkan Nama"
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 4]}>
              <Button icon={{ name: 'search' }} type="submit" style={{ width: '83px', height: '35px' }}>
                cari
              </Button>
            </Column>
          </Row>
        </form>

        <Row>
          <Column col={[12, 12, 4]}>
            {/* Tindakan Masal */}
            <FormGroup>
              <Select<SelectOption>
                options={options.tindakanMasal}
                defaultValue={defaultValue.tindakanMasal}
                onChange={(e: any) => handleSelectOnChange(e, 'tindakanMasal')}
                placeholder="Tindakan masal"
              />
            </FormGroup>
          </Column>


          <Column col={[12, 12, 4]}>
            <Button icon={{ name: 'play-circle' }} type="submit" style={{ width: '113px', height: '35px' }}>
              Eksekusi
             </Button>
          </Column>

          <Column col={[12, 12, 4]} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <span style={{ marginBottom: '15px' }}>Tampilkan</span>&nbsp;&nbsp;
              <span>
              <FormGroup style={{ width: '90px' }}>
                <Select<SelectOption>
                  options={options.showEntris}
                  defaultValue={defaultValue.showEntris}
                  onChange={(e: any) => handleSelectOnChange(e, 'showEntris')}
                />
              </FormGroup>
            </span>&nbsp;&nbsp;
              <span style={{ marginBottom: '15px' }}>entri</span>
          </Column>
        </Row>

        <Table
          columns={columns}
          data={datas}
          loading={isTableLoading}
          pagination={{
            onPageChange: handlePageChange,
            currentPage: currentPage,
            perPage: perPage,
            totalData: total,
            totalPage: lastPage,
          }}

        />
      </Fragment>
    )
  }


  return (
    <Card>
      <h2 css={[styles.heading]}>Validasi KTA</h2>
      {
        checkInternet ?
          <Content /> :
          <ValidasiInternet state={messageSubmit} onNewValidate={() => setCheckInternet(true)} />
      }
    </Card>
  )
}

export default Validasi
