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
  Icon,
  Checkbox
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
  const [isBulkLoading, setIsBulkLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [inputName, setInputName] = useState<string>('')
  const [inputNik, setInputNik] = useState<string>('')
  const [perPage, setPerPage] = useState<number>(10)
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [idAll, setIdAll] = useState<any>([])
  const [selected, setSelected] = useState<any>([])
  const [showActiveSearch, setShowActiveSearch] = useState<boolean>(false)
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

  const handleSelectBulkChange = (selectedOption: any) => {
    const value = selectedOption && 'value' in selectedOption ? selectedOption.value : undefined;
    setTindankanMasal(value)
  };

  const handleBulkAction = () => {
    if (tindakanMasal === undefined) {
      alert('Tindakan massal belum dipilih')
    } else if (!selected.length && !idAll.length) {
      alert('Tidak ada data yang dicentang')
    } else {
      _handleSubmitBulkAction()
    }
  }

  const _handleBodyCheckboxChange = (e: any, record: any) => {
    const { checked } = e.target;
    const id = record.id

    if (checked) {
      setSelected([...selected, id])
    } else {
      const array = [...selected];
      const deleteIndex = array.indexOf(id);
      if (deleteIndex > -1) {
        array.splice(deleteIndex, 1);
      }
      setSelected(array)
    }
  }

  const CheckBoxHeader = () => (
    <Checkbox
      instanceId="checkbox-table-head"
      checked={selectAll}
      onChange={() => setSelectAll(!selectAll)}
    />
  )

  const columns = [
    {
      title: <CheckBoxHeader />,
      key: 'checkbox',
      width: 40,
      render: (value: any, record: any) => {
        return (
          <Checkbox
            instanceId={record.key}
            checked={selected.includes(record.id) || selectAll}
            onChange={(e: any) => _handleBodyCheckboxChange(e, record)}
          />
        );
      },
    },
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
      width: 150,
      render: (id: any) => {
        return (

          <div style={{ display: 'flex', flexDirection: 'column' }}>

            <a style={{ padding: '5px', width: '75px', backgroundColor: '#000', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => _handlePostMembers()}>
              <Icon name={'address-card'} />&nbsp;
                    Lihat
                </a><br />
            <a style={{ padding: '5px', width: '86px', backgroundColor: '#47B920', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => _handlePostMembers(id, "APPROVED")}>
              <Icon name={'check-circle'} />&nbsp;
                  Validasi
              </a><br />
            <a style={{ padding: '5px', width: '79px', backgroundColor: '#CE352D', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => _handlePostMembers(id, "DELETED")}>
              <Icon name={'trash'} />&nbsp;
                  Hapus
              </a>

          </div>

        )
      }
    },
  ];

  const _handleSubmitBulkAction = async () => {
    setIsBulkLoading(true)
    let res;
    let idBulk = selectAll ? idAll[0] : selected
    for (const val of idBulk) {
      res = await _handlePostMembers(val, tindakanMasal, true)
      if (res.message !== "Success Approved Member") {
        setMessageSubmit("failed")
        setCheckInternet(false)
      }
    }

    if (res.message === "Success Approved Member") {
      setMessageSubmit("success")
      setIsTableLoading(false)
      setIsBulkLoading(false)
      setCheckInternet(false)
    }
  }

  const _handlePostMembers = async (...args: any) => {
    setIsTableLoading(true)
    const [id, status, isBulk] = args
    const payload = {
      member_id: id,
      status: status
    }

    const { data } = await postVerifiedMembers(payload)
    if (isBulk) return data
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
    setCurrentPage(meta?.current_page)
    setTotal(meta?.total)
    setLastPage(meta?.last_page)
    setDatas(data)
    setIsTableLoading(false)
    let arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i].id)
    }
    setIdAll([...idAll, arr])

  }

  const handlePageChange = async (pageNum: number) => {
    setPage(pageNum)
  };

  const _handleSubmitSearch = (data: any) => {
    setInputName(data.fullname)
    setInputNik(data.id_card)
    setShowActiveSearch(true)
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
            <Column col={[12, 12, 12]}>
              {showActiveSearch &&
                <div css={[styles.searchInfo, styles.mtxs]}>
                  Pencarian aktif:&nbsp;
                  {!inputNik && !inputName && <strong>Tidak Ada</strong>}
                  {inputNik && <strong>nik: {inputNik}</strong>}
                  {inputName && <strong>nama: {inputName}</strong>}
                </div>
              }
            </Column>
          </Row>
        </form>
        <Row>
          <Column col={[12, 12, 4]}>
            {/* Tindakan Masal */}
            <FormGroup>
              <Select<SelectOption>
                instanceId="select-bulk"
                options={options.tindakanMasal}
                onChange={handleSelectBulkChange}
                placeholder="Tindakan masal"
                clearable
              />
            </FormGroup>
          </Column>


          <Column col={[12, 12, 4]}>
            <Button
              icon={{ name: 'play-circle' }}
              style={{ width: '113px', height: '35px' }}
              onClick={handleBulkAction}
              loading={isBulkLoading}
            >
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
      </Fragment >
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
