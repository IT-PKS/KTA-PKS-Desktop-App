/** @jsx jsx */
import React, { Fragment } from 'react';
import Card from 'components/deskstop/Card/Card'
import { useForm } from 'react-hook-form';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Validasi.styles';
import { Theme } from '../../../components/base/src/theme';
import Table from '../../../components/base/src/components/Table/Table'

import formHelper, {
  RegisterFormData,
  SelectOption
} from '../../../components/base/src/staticPages/Register/Register.formHelper';

import ValidasiInternet from './ValidasiInternet'

// Components
import {
  Column,
  FormGroup,
  Input,
  Button,
  Row,
  Select
} from 'kta-ui-components';


type iProps = {
  defaultValues?: { [K in keyof RegisterFormData]?: RegisterFormData[K] };
  state?: 'default' | 'success' | 'failed';
  onSubmit(): any;
  /** @default false */
  loading?: boolean;
  setState(value: any): any;
};


const Validasi: React.FC<iProps> = (props) => {
  const { defaultValues = {
    showEntris: [
      { label: '10', value: '10', }
    ]
  }, state = 'default', onSubmit, loading, setState } = props;
  const { register, handleSubmit, errors, setValue, formState } = useForm<RegisterFormData>({
    defaultValues,
  });
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { errorMessages, pattern } = formHelper;

  const [tindakanMasal, setTindakanMasal] = React.useState<any | []>([])
  const [options, setOptions] = React.useState<any | []>({
    showEntris: [
      { label: '10', value: '10', },
      { label: '25', value: '25', },
      { label: '50', value: '50', },
      { label: '10', value: '10', },
    ]
  })

  const [checkInternet, setCheckInternet] = React.useState<Boolean>(true)


  const getSelectDefaultValue = (key: SelectKeys) => {
    let selectedOption: Array<SelectOption> | undefined;
    const currValue = defaultValues && defaultValues[key];

    if (currValue) selectedOption = options[key].filter(option => option.value === currValue);

    return selectedOption;
  };

  const handleSelectOnChange = (
    key: keyof RegisterFormData,
    callback?: (selectedOption: ValueType<SelectOption>) => void,
  ) => (selectedOption: ValueType<SelectOption>) => {
    if (selectedOption && 'value' in selectedOption) {
      setValue(key, selectedOption.value, {
        shouldValidate: formState.isSubmitted,
      });
    }
    callback && callback(selectedOption);
  };


  const columns = [
    {
      title: 'Tanggal Registrasi',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      width: 120,
    },
    {
      title: 'NIK',
      dataIndex: 'nik',
      key: 'nik',
      width: 200,
    },
    {
      title: 'Nama Lengkap',
      dataIndex: 'fullname',
      key: 'fullname',
      width: 250,
    },
    {
      title: 'Kode Registrasi',
      dataIndex: 'registrationCode',
      key: 'registrationCode',
      width: 200,
    },
    {
      title: 'Tindakan',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <Fragment>
          <a href="#">Lihat</a><br />
          <a href="#">Validasi</a><br />
          <a href="#">Hapus</a>
        </Fragment>
      )
    },
  ];

  const data = [
    { registrationDate: '2020/10/10', nik: 'Jack', fullname: 28, registrationCode: 'some where', key: '1' },
    { registrationDate: '2020/10/10', nik: 'Rose', fullname: 36, registrationCode: 'some where', key: '2' },
  ];

  const Content = () => {
    return (
      <Fragment>
        <form css={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row>
            <Column col={[12, 12, 4]}>
              {/* Nama Lengkap */}
              <FormGroup>
                <Input
                  innerRef={register({
                    required: {
                      value: true,
                      message: errorMessages.namaLengkap.required,
                    },
                  })}
                  name="namaLengkap"
                  errorMessage={errors.namaLengkap && errors.namaLengkap.message}
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
                  name="namaPanggilan"
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
          <Row>
            <Column col={[12, 12, 4]}>
              {/* Golongan Darah */}
              <FormGroup>
                <Select<SelectOption>
                  options={tindakanMasal}
                  defaultValue={getSelectDefaultValue('golonganDarah')}
                  onChange={handleSelectOnChange('golonganDarah')}
                  innerRef={() =>
                    register(
                      { name: 'golonganDarah' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.golonganDarah.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.golonganDarah && errors.golonganDarah.message}
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
                    defaultValue={[
                      { label: '10', value: '10', }
                    ]}
                    onChange={handleSelectOnChange('golonganDarah')}
                    innerRef={() =>
                      register(
                        { name: 'golonganDarah' },
                        {
                          required: {
                            value: true,
                            message: errorMessages.golonganDarah.required,
                          },
                        },
                      )
                    }
                    errorMessage={errors.golonganDarah && errors.golonganDarah.message}
                  />
                </FormGroup>
              </span>&nbsp;&nbsp;
              <span style={{ marginBottom: '15px' }}>entri</span>
            </Column>
          </Row>
        </form>
        <Table columns={columns} data={data} />
      </Fragment>
    )
  }


  return (
    <Card>
      <h2 css={[styles.heading]}>Validasi KTA</h2>
      {
        checkInternet ?
          <Content /> :
          <ValidasiInternet />
      }
    </Card>
  )
}

export default Validasi
