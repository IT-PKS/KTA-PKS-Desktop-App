import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTheme } from 'emotion-theming'
import { Theme } from '../../base/src/theme'
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ValueType } from 'react-select';
import isNull from 'lodash/isNull';
import { checkInternetConnection } from '../../../utils/Utils';
import initSQLite from '../../../services/sqlite/initSQLite'

// Components
import {
  Button,
  Column,
  FormGroup,
  Icon,
  Input,
  InputMask,
  Label,
  LeafletMapPicker,
  Row,
  Select,
  Textarea,
  UploadBox,
  Modal,
  ModalProps,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'components/base';

import formHelper, {
  RegisterFormData,
  SelectOption,
  SelectKeys,
  ErrorMessageKeys,
} from '../../base/src/staticPages/Register/Register.formHelper';

import {
  getGenders,
  getProvinces,
  getCities,
  getDistricts,
  getSubDistricts,
  getReligions,
  getOccupations,
  getEducations,
  getMarital,
  getBloodType,
  getCountries
} from 'client/AdminClient';
import useDidMount from '../../../components/base/src/utils/hooks/useDidMount'

// Local Models
import { Gender } from '../../../entity/Gender'
import { Religion } from '../../../entity/Religion'
import { Occupation } from '../../../entity/Occupation'
import { Education } from '../../../entity/Education'
import { MaritalStatus } from '../../../entity/MaritalStatus'
import { Blood } from '../../../entity/Blood'

import { isPossiblyNumber, validateFileType, validateFileSize } from '../../../components/base/src/utils';

import createStyles from '../../../pages/staticPage/PersonalData/PersonalData.styles';

type Props = {
  defaultValues?: { [K in keyof RegisterFormData]?: RegisterFormData[K] };
  open: ModalProps['open'];
  toggle: ModalProps['toggle'];
  data: any;
};

const ModalDeleteMember: React.FC<Props> = props => {
  const { defaultValues, toggle, open, data } = props;
  const { register, handleSubmit, errors, setValue, formState } = useForm<RegisterFormData>({
    defaultValues,
  });

  const fullAddress = data?.address.split("RT")
  const address = fullAddress[0]
  const rtRw = fullAddress[1].split("RW")
  const rt = rtRw[0]
  const rw = rtRw[1]

  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const { errorMessages, pattern } = formHelper;

  const [jenisKelamin, setJenisKelamin] = React.useState<any | []>([])
  const [valueJenisKelamin, setValueJenisKelamin] = React.useState<any | []>([])
  const [golonganDarah, setGolonganDarah] = React.useState<any | []>([])
  const [valueGolonganDarah, setValueGolonganDarah] = React.useState<any | []>([])
  const [provinsi, setProvinsi] = React.useState<any | []>([])
  const [kotaKabupaten, setKotaKabupaten] = React.useState<any | []>([])
  const [kecamatan, setKecamatan] = React.useState<any | []>([])
  const [kelurahanDesa, setKelurahanDesa] = React.useState<any | []>([])
  const [negaraSaatIni, setNegaraSaatIni] = React.useState<any | []>([])
  const [detailNegaraSaatIni, setDetailNegaraSaatIni] = React.useState<any | []>([])
  const [agama, setAgama] = React.useState<any | []>([])
  const [detailAgama, setDetailAgama] = React.useState<any | []>([])
  const [statusPerkawinan, setStatusPerkawinan] = React.useState<any | []>([])
  const [detailStatusPerkawinan, setDetailStatusPerkawinan] = React.useState<any | []>([])
  const [pekerjaan, setPekerjaan] = React.useState<any | []>([])
  const [detailPekerjaan, setDetailPekerjaan] = React.useState<any | []>([])
  const [pendidikanTerakhir, setPendidikanTerakhir] = React.useState<any | []>([])
  const [detailPendidikanTerakhir, setDetailPendidikanTerakhir] = React.useState<any | []>([])


  const [provinsiValue, setProvinsiValue] = React.useState<any>(null);
  const [detailProvinsi, setDetailProvinsi] = React.useState<any>(null);
  const [kotaKabupatenValue, setKotaKabupatenValue] = React.useState<string | null>(null);
  const [detailKabupaten, setDetailKabupaten] = React.useState<any>(null);
  const [kecamatanValue, setKecamatanValue] = React.useState<string | null>(null);
  const [detailKecamatan, setDetailKecamatan] = React.useState<any>(null);
  const [kelurahanDesaValue, setKelurahanDesaValue] = React.useState<string | null>(null);
  const [detailKelurahanDesa, setDetailKelurahanDesa] = React.useState<any>(null);
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const birthdate = data.birthdate.split('-')

  const normalizeDropdown = (arrayObj: any, keyValue: string) => {
    for (let i = 0; i < arrayObj.length; i++) {
      arrayObj[i].label = arrayObj[i][keyValue];
      arrayObj[i].value = arrayObj[i]['id'];
    }
    return arrayObj;
  };

  const internetTimeout: number = 3000
  const _handleGetGenders = async () => {
    try {
      await checkInternetConnection(internetTimeout)
      const { data: jenisKelamin } = await getGenders();
      setJenisKelamin(normalizeDropdown(jenisKelamin, 'gender'));
      const dataJenisKelamin: any = jenisKelamin.find((v) => v.label === data?.gender)
      setValueJenisKelamin(dataJenisKelamin);
    } catch (error) {
      const connection: any = await initSQLite()
      const jenisKelamin = await connection.manager.find(Gender)
      setJenisKelamin(normalizeDropdown(jenisKelamin, 'gender'));
      const dataJenisKelamin: any = jenisKelamin.find((v) => v.label === data?.gender)
      setValueJenisKelamin(dataJenisKelamin);
    }
  }

  const _handleGetReligions = async () => {
    try {
      await checkInternetConnection(internetTimeout)
      const { data: agama } = await getReligions();
      setAgama(normalizeDropdown(agama, 'religion'));
      const getDetailAgama: any = agama.find((v: any) => v.label === data?.religion)
      setDetailAgama(getDetailAgama);
    } catch (error) {
      const connection: any = await initSQLite()
      const agama = await connection.manager.find(Religion)
      setAgama(normalizeDropdown(agama, 'religion'));
      const getDetailAgama: any = agama.find((v: any) => v.label === data?.religion)
      setDetailAgama(getDetailAgama);
    }
  }

  const _handleGetOccupations = async () => {
    try {
      await checkInternetConnection(internetTimeout)
      const { data: pekerjaan } = await getOccupations();
      setPekerjaan(normalizeDropdown(pekerjaan, 'occupation'));
      const getDetailPekerjaan: any = pekerjaan.find((v: any) => v.label === data?.job)
      setDetailPekerjaan(getDetailPekerjaan);
    } catch (error) {
      const connection: any = await initSQLite()
      const pekerjaan = await connection.manager.find(Occupation)
      setPekerjaan(normalizeDropdown(pekerjaan, 'occupation'));
      const getDetailPekerjaan: any = pekerjaan.find((v: any) => v.label === data?.job)
      setDetailPekerjaan(getDetailPekerjaan);
    }
  }

  const _handleGetEducations = async () => {
    try {
      await checkInternetConnection(internetTimeout)
      const { data: pendidikanTerakhir } = await getEducations();
      setPendidikanTerakhir(normalizeDropdown(pendidikanTerakhir, 'education'));
      const getDetailPendidikanTerakhir: any = pendidikanTerakhir.find((v: any) => v.label === data?.last_education)
      setDetailPendidikanTerakhir(getDetailPendidikanTerakhir);
    } catch (error) {
      const connection: any = await initSQLite()
      const pendidikanTerakhir = await connection.manager.find(Education)
      setPendidikanTerakhir(normalizeDropdown(pendidikanTerakhir, 'education'));
      const getDetailPendidikanTerakhir: any = pendidikanTerakhir.find((v: any) => v.label === data?.last_education)
      setDetailPendidikanTerakhir(getDetailPendidikanTerakhir);
    }
  }

  const _handleGetMarital = async () => {
    try {
      await checkInternetConnection(internetTimeout)
      const { data: statusPerkawinan } = await getMarital();
      setStatusPerkawinan(normalizeDropdown(statusPerkawinan, 'status'));
      const getDetailStatusPekawinan: any = statusPerkawinan.find((v: any) => v.label === data?.marital_status)
      setDetailStatusPerkawinan(getDetailStatusPekawinan);
    } catch (error) {
      const connection: any = await initSQLite()
      const statusPerkawinan = await connection.manager.find(MaritalStatus)
      setStatusPerkawinan(normalizeDropdown(statusPerkawinan, 'status'));
      const getDetailStatusPekawinan: any = statusPerkawinan.find((v: any) => v.label === data?.marital_status)
      setDetailStatusPerkawinan(getDetailStatusPekawinan);
    }
  }

  const _handleGetBloodType = async () => {
    try {
      await checkInternetConnection(internetTimeout)
      const { data: golonganDarah } = await getBloodType();
      setGolonganDarah(normalizeDropdown(golonganDarah, 'blood'));
      const bloodType: any = golonganDarah.find((v: any) => v.label === data?.blood_type)
      setValueGolonganDarah(bloodType)

    } catch (error) {
      const connection: any = await initSQLite()
      const golonganDarah = await connection.manager.find(Blood)
      setGolonganDarah(normalizeDropdown(golonganDarah, 'blood'))
      const bloodType: any = golonganDarah.find((v: any) => v.label === data?.blood_type)
      setValueGolonganDarah(bloodType);
    }
  }

  const _handleGetCountries = async () => {
    const { data: countries } = await getCountries();
    setNegaraSaatIni(normalizeDropdown(countries, 'name'));
    const negaraSaatIni: any = countries.find((v) => v.label === data?.country)
    setDetailNegaraSaatIni(negaraSaatIni)
  }

  const _handleGetProvinces = async () => {
    const { data: provinsi } = await getProvinces();
    setProvinsi(normalizeDropdown(provinsi, 'name'));
    const province: any = provinsi.find((v) => v.label === data?.province)
    setDetailProvinsi(province)
    setProvinsiValue(province.value)

  }

  const _hanldeGetCities = async (provincyId: string) => {
    const { data: kotaKabupaten } = await getCities(provincyId);
    setKotaKabupaten(normalizeDropdown(kotaKabupaten, 'name'));
    const kabupaten: any = kotaKabupaten.find((v) => v.label === data?.city)
    setDetailKabupaten(kabupaten)
    setKotaKabupatenValue(kabupaten.value)

  }

  const _hanldeGetDistricts = async (cityId: string) => {
    const { data: kecamatan } = await getDistricts(cityId)
    setKecamatan(normalizeDropdown(kecamatan, 'name'))
    const getKecamatan: any = kecamatan.find((v) => v.label === data?.district)
    setDetailKecamatan(getKecamatan)
    setKecamatanValue(getKecamatan.value)
  }

  const _hanldeGetSubDistricts = async (districtId: string) => {
    const { data: kelurahanDesa } = await getSubDistricts(districtId);
    setKelurahanDesa(normalizeDropdown(kelurahanDesa, 'name'));
    const getKelurahanDesa: any = kelurahanDesa.find((v) => v.label === data?.sub_district)
    setDetailKelurahanDesa(getKelurahanDesa)
    setKelurahanDesaValue(getKelurahanDesa.value)
  }

  React.useEffect(() => {
    if (provinsiValue !== null) _hanldeGetCities(provinsiValue)
  }, [provinsiValue])

  React.useEffect(() => {
    if (kotaKabupatenValue !== null) _hanldeGetDistricts(kotaKabupatenValue)
  }, [kotaKabupatenValue])

  React.useEffect(() => {
    if (kecamatanValue !== null) _hanldeGetSubDistricts(kecamatanValue)
  }, [kecamatanValue])

  useDidMount(() => {
    _handleGetGenders();
    _handleGetProvinces();
    _handleGetReligions();
    _handleGetOccupations();
    _handleGetEducations();
    _handleGetMarital();
    _handleGetBloodType();
    _handleGetCountries();
  })


  const getSelectDefaultValue = (key: SelectKeys) => {
    let selectedOption: Array<SelectOption> | undefined;

    if (data.key) selectedOption = key.find((v) => v.value === data.key);

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

  const getUploadBoxErrorMessage = (key: ErrorMessageKeys) => {
    let message;
    if (errors[key]) {
      const type = errors[key]?.type;
      const fotoScanKTP = errorMessages[key];
      if (type === 'required') {
        message = fotoScanKTP.required;
      } else if (type === 'fileType' && fotoScanKTP.fileType) {
        message = fotoScanKTP.fileType;
      } else if (type === 'fileSize' && fotoScanKTP.fileSize) {
        message = fotoScanKTP.fileSize;
      }
    }
    return message;
  };

  const numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowLeadingZeroes: true,
  });

  const dateMask = (rawValue: string) => {
    const mask = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
    if (rawValue.charAt(0) === '3') {
      mask[1] = /[0-1]/;
    }
    if (rawValue.charAt(3) === '0') {
      mask[4] = /[1-9]/;
    }
    if (rawValue.charAt(3) === '1') {
      mask[4] = /[0-2]/;
    }
    return mask;
  };

  const getTanggalLahirErrorMessage = () => {
    let message;
    if (errors.tanggalLahir) {
      const type = errors.tanggalLahir.type;
      if (type === 'required') {
        message = errorMessages.tanggalLahir.required;
      } else if (type === 'pattern') {
        message = errorMessages.tanggalLahir.pattern;
      }
    }
    return message;
  };


  const onSaving = () => { }

  return (
    <Modal open={open} toggle={toggle} size="lg">
      <ModalHeader onClose={toggle}>Ubah Data</ModalHeader>
      <ModalBody>
        <form css={styles.form} onSubmit={handleSubmit(onSaving)} noValidate>
          {/* Data Diri */}
          <h2 css={[styles.heading, styles.headingFirst]}>Data Diri</h2>

          {/* NIK / No. KTP */}
          <FormGroup>
            <Label required>NIK / No. KTP</Label>
            <InputMask
              innerRef={register({
                validate: {
                  required: value => String(parseInt(value)) !== 'NaN',
                },
              })}
              mask={numberMask}
              name="nik"
              errorMessage={
                errors.nik && errors.nik.type === 'required' && errorMessages.nik.required
              }
              type="text"
              placeholder="Nomer Induk Kependudukan anda"
              value={data?.id_card}
            />
          </FormGroup>

          <Row>
            <Column col={[12, 12, 6]}>
              {/* Nama Lengkap */}
              <FormGroup>
                <Label required>Nama Lengkap</Label>
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
                  placeholder="Sesuai tertera di KTP"
                  defaultValue={data?.fullname}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 6]}>
              {/* Nama Panggilan */}
              <FormGroup>
                <Label>Nama Panggilan</Label>
                <Input
                  innerRef={register}
                  name="namaPanggilan"
                  type="text"
                  placeholder="Akrab dipanggil dengan nama..."
                  defaultValue={data?.nickname}
                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column col={[12, 12, 6]}>
              {/* Tempat Lahir */}
              <FormGroup>
                <Label required>Tempat Lahir</Label>
                <Input
                  innerRef={register({
                    required: {
                      value: true,
                      message: errorMessages.tempatLahir.required,
                    },
                  })}
                  name="tempatLahir"
                  errorMessage={errors.tempatLahir && errors.tempatLahir.message}
                  type="text"
                  placeholder="Nama kota"
                  defaultValue={data?.birthplace}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 6]}>
              {/* Tanggal Lahir */}
              <FormGroup>
                <Label required>Tanggal Lahir</Label>
                <InputMask
                  innerRef={register({
                    validate: {
                      required: value => {
                        const v = value.replace(/_/g, '').replace(/\//g, '');
                        return !!v;
                      },
                      pattern: value => {
                        const v = value.slice(0, 10);
                        return pattern.date.test(v);
                      },
                    },
                  })}
                  mask={dateMask}
                  name="tanggalLahir"
                  errorMessage={getTanggalLahirErrorMessage()}
                  type="text"
                  placeholder="Dalam format dd/mm/yyyy"
                  defaultValue={birthdate && `${birthdate[2]}/${birthdate[1]}/${birthdate[0]}`}

                />
              </FormGroup>
            </Column>
          </Row>
          <Row>
            <Column col={[12, 12, 6]}>
              {/* Jenis Kelamin */}
              <FormGroup>
                <Label required>Jenis Kelamin</Label>
                <Select<SelectOption>
                  options={jenisKelamin}
                  onChange={handleSelectOnChange('jenisKelamin', selectedOption => {
                    if (selectedOption && 'value' in selectedOption)
                      setValueJenisKelamin(jenisKelamin.find((v) => v.id === selectedOption.value));
                  })}
                  innerRef={() =>
                    register(
                      { name: 'jenisKelamin' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.jenisKelamin.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.jenisKelamin && errors.jenisKelamin.message}
                  placeholder="Laki-laki / Perempuan"
                  value={valueJenisKelamin}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 6]}>
              {/* Golongan Darah */}
              <FormGroup>
                <Label required>Golongan Darah</Label>
                <Select<SelectOption>
                  options={golonganDarah}
                  defaultValue={getSelectDefaultValue('golonganDarah')}
                  onChange={handleSelectOnChange('golonganDarah', selectedOption => {
                    if (selectedOption && 'value' in selectedOption)
                      setValueGolonganDarah(golonganDarah.find((v: any) => v.id === selectedOption.value));
                  })}
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
                  placeholder="A / B / AB / O"
                  value={valueGolonganDarah}

                />
              </FormGroup>
            </Column>
          </Row>

          {/* Alamat Sesuai KTP */}
          <h2 css={styles.heading}>Alamat Sesuai KTP</h2>

          <Row>
            <Column col={[12, 12, 6]}>
              {/* Provinsi */}
              <FormGroup>
                <Label required>Provinsi</Label>
                <Select<SelectOption>
                  options={provinsi}
                  defaultValue={getSelectDefaultValue('provinsi')}
                  onChange={handleSelectOnChange('provinsi', selectedOption => {
                    if (selectedOption && 'value' in selectedOption)
                      setProvinsiValue(provinsi.find((v: any) => v.id === selectedOption.value));
                  })}
                  innerRef={() =>
                    register(
                      { name: 'provinsi' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.provinsi.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.provinsi && errors.provinsi.message}
                  placeholder="Pilih Provinsi"
                  value={detailProvinsi}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 6]}>
              {/* Kota / Kabupaten */}
              <FormGroup>
                <Label required>Kota / Kabupaten</Label>
                <Select<SelectOption>
                  options={kotaKabupaten}
                  defaultValue={getSelectDefaultValue('kotaKabupaten')}
                  onChange={handleSelectOnChange('kotaKabupaten', selectedOption => {
                    if (selectedOption && 'value' in selectedOption)
                      setKotaKabupatenValue(kotaKabupaten.find((v: any) => v.id === selectedOption.value));
                  })}
                  innerRef={() =>
                    register(
                      { name: 'kotaKabupaten' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.kotaKabupaten.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.kotaKabupaten && errors.kotaKabupaten.message}
                  placeholder="Pilih Kota / Kabupaten"
                  disabled={isNull(provinsiValue)}
                  value={detailKabupaten}
                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column col={[12, 12, 6]}>
              {/* Kecamatan */}
              <FormGroup>
                <Label required>Kecamatan</Label>
                <Select<SelectOption>
                  options={kecamatan}
                  defaultValue={getSelectDefaultValue('kecamatan')}
                  onChange={handleSelectOnChange('kecamatan', selectedOption => {
                    if (selectedOption && 'value' in selectedOption) {
                      setKecamatanValue(kecamatan.find((v: any) => v.id === selectedOption.value));
                    }
                  })}
                  innerRef={() =>
                    register(
                      { name: 'kecamatan' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.kecamatan.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.kecamatan && errors.kecamatan.message}
                  placeholder="Pilih Kecamatan"
                  disabled={isNull(provinsiValue) || isNull(kotaKabupatenValue)}
                  value={detailKecamatan}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 6]}>
              {/* Kelurahan / Desa */}
              <FormGroup>
                <Label required>Kelurahan / Desa</Label>
                <Select<SelectOption>
                  options={kelurahanDesa}
                  defaultValue={getSelectDefaultValue('kelurahanDesa')}
                  onChange={handleSelectOnChange('kelurahanDesa', selectedOption => {
                    if (selectedOption && 'value' in selectedOption)
                      setKelurahanDesaValue(kelurahanDesa.find((v: any) => v.id === selectedOption.value));
                  })}
                  innerRef={() =>
                    register(
                      { name: 'kelurahanDesa' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.kelurahanDesa.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.kelurahanDesa && errors.kelurahanDesa.message}
                  placeholder="Pilih Kelurahan / Desa"
                  disabled={
                    isNull(provinsiValue) || isNull(kotaKabupatenValue) || isNull(kecamatanValue)
                  }
                  value={detailKelurahanDesa}
                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column col={[12, 12, 6]}>
              {/* Alamat */}
              <FormGroup>
                <Label required>Alamat</Label>
                <Input
                  innerRef={register({
                    required: {
                      value: true,
                      message: errorMessages.alamat.required,
                    },
                  })}
                  name="alamat"
                  errorMessage={errors.alamat && errors.alamat.message}
                  type="text"
                  placeholder="Contoh: Jalan A Perum B No. 1111"
                  defaultValue={address}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 6, 3]}>
              {/* RT */}
              <FormGroup>
                <Label required>RT</Label>
                <InputMask
                  innerRef={register({
                    validate: {
                      required: value => String(parseInt(value)) !== 'NaN',
                    },
                  })}
                  mask={numberMask}
                  name="rt"
                  errorMessage={
                    errors.rt && errors.rt.type === 'required' && errorMessages.rt.required
                  }
                  type="text"
                  placeholder="RT"
                  defaultValue={rt}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 6, 3]}>
              {/* RW */}
              <FormGroup>
                <Label required>RW</Label>
                <InputMask
                  innerRef={register({
                    validate: value => String(parseInt(value)) !== 'NaN',
                  })}
                  mask={numberMask}
                  name="rw"
                  errorMessage={errors.rw && errorMessages.rw.required}
                  type="text"
                  placeholder="RW"
                  defaultValue={rw}
                />
              </FormGroup>
            </Column>
          </Row>

          {/* Alamat Saat Ini */}
          <h2 css={styles.heading}>Alamat Saat Ini</h2>

          {/* Alamat Saat Ini */}
          <FormGroup>
            <Label>Alamat Saat Ini</Label>
            <Textarea
              innerRef={register}
              name="alamatSaatIni"
              placeholder="Isi apabila saat ini anda tidak tinggal di alamat yang tertera pada KTP"
              defaultValue={data?.domicile}
            />
            <LeafletMapPicker
              onChange={latlng => {
                setValue('alamatSaatIniLatLng', `${latlng.lat},${latlng.lng}`);
              }}
            />
            <Input innerRef={register} type="hidden" name="alamatSaatIniLatLng" />
          </FormGroup>
          {/* Negara Saat Ini (bagi yang di luar negeri) */}
          <FormGroup>
            <Label>Negara Saat Ini (bagi yang di luar negeri)</Label>
            <Select<SelectOption>
              options={negaraSaatIni}
              defaultValue={getSelectDefaultValue('negaraSaatIni')}
              onChange={handleSelectOnChange('negaraSaatIni', selectedOption => {
                if (selectedOption && 'value' in selectedOption)
                  setDetailNegaraSaatIni(negaraSaatIni.find((v) => v.id === selectedOption.value))
              })}
              innerRef={() => register({ name: 'negaraSaatIni' })}
              errorMessage={errors.negaraSaatIni && errors.negaraSaatIni.message}
              placeholder="Pilih Negara"
              value={detailNegaraSaatIni}
            />
          </FormGroup>

          {/* Lainnya */}
          <h2 css={styles.heading}>Lainnya</h2>

          <Row>
            <Column col={[12, 12, 6]}>
              {/* Agama */}
              <FormGroup>
                <Label required>Agama</Label>
                <Select<SelectOption>
                  options={agama}
                  defaultValue={getSelectDefaultValue('agama')}
                  onChange={handleSelectOnChange('agama', selectedOption => {
                    if (selectedOption && 'value' in selectedOption)
                      setDetailAgama(agama.find((v: any) => v.id === selectedOption.value));
                  })}
                  innerRef={() =>
                    register(
                      { name: 'agama' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.agama.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.agama && errors.agama.message}
                  placeholder="Agama"
                  value={detailAgama}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 6]}>
              {/* Status Perkawinan */}
              <FormGroup>
                <Label required>Status Perkawinan</Label>
                <Select<SelectOption>
                  options={statusPerkawinan}
                  defaultValue={getSelectDefaultValue('statusPerkawinan')}
                  onChange={handleSelectOnChange('statusPerkawinan', selectedOption => {
                    if (selectedOption && 'value' in selectedOption)
                      setDetailStatusPerkawinan(statusPerkawinan.find((v: any) => v.id === selectedOption.value));
                  })}
                  innerRef={() =>
                    register(
                      { name: 'statusPerkawinan' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.statusPerkawinan.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.statusPerkawinan && errors.statusPerkawinan.message}
                  placeholder="Kawin / Belum Kawin"
                  value={detailStatusPerkawinan}

                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column col={[12, 12, 6]}>
              {/* Pekerjaan */}
              <FormGroup>
                <Label required>Pekerjaan</Label>
                <Select<SelectOption>
                  options={pekerjaan}
                  defaultValue={getSelectDefaultValue('pekerjaan')}
                  onChange={handleSelectOnChange('pekerjaan', selectedOption => {
                    if (selectedOption && 'value' in selectedOption)
                      setDetailPekerjaan(pekerjaan.find((v: any) => v.id === selectedOption.value));
                  })}
                  innerRef={() =>
                    register(
                      { name: 'pekerjaan' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.pekerjaan.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.pekerjaan && errors.pekerjaan.message}
                  placeholder="Pekerjaan"
                  value={detailPekerjaan}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 6]}>
              {/* Pendidikan Terakhir */}
              <FormGroup>
                <Label required>Pendidikan Terakhir</Label>
                <Select<SelectOption>
                  options={pendidikanTerakhir}
                  defaultValue={getSelectDefaultValue('pendidikanTerakhir')}
                  onChange={handleSelectOnChange('pendidikanTerakhir', selectedOption => {
                    if (selectedOption && 'value' in selectedOption)
                      setDetailPendidikanTerakhir(pendidikanTerakhir.find((v: any) => v.id === selectedOption.value));
                  })}
                  innerRef={() =>
                    register(
                      { name: 'pendidikanTerakhir' },
                      {
                        required: {
                          value: true,
                          message: errorMessages.pendidikanTerakhir.required,
                        },
                      },
                    )
                  }
                  errorMessage={errors.pendidikanTerakhir && errors.pendidikanTerakhir.message}
                  placeholder="Jenjang Pendidikan"
                  value={detailPendidikanTerakhir}
                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column col={[12, 12, 6]}>
              {/* Email */}
              <FormGroup>
                <Label required>Email</Label>
                <Input
                  innerRef={register({
                    required: {
                      value: true,
                      message: errorMessages.email.required,
                    },
                    pattern: {
                      value: pattern.email,
                      message: errorMessages.email.required || '',
                    },
                  })}
                  name="email"
                  errorMessage={errors.email && errors.email.message}
                  type="text"
                  placeholder="Contoh: email@website.com"
                  defaultValue={data?.email}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 6]}>
              {/* No. Telp / HP / WhatsApp */}
              <FormGroup>
                <Label required>No. Telp / HP / WhatsApp</Label>
                <InputMask
                  innerRef={register({
                    validate: {
                      required: value => String(parseInt(value)) !== 'NaN',
                    },
                  })}
                  mask={numberMask}
                  name="noTelp"
                  errorMessage={
                    errors.noTelp &&
                    errors.noTelp.type === 'required' &&
                    errorMessages.noTelp.required
                  }
                  type="text"
                  placeholder="Contoh: 080011112222"
                  defaultValue={data?.phone}

                />
              </FormGroup>
            </Column>
          </Row>
          <Row>
            <Column col={[12, 12, 6]}>
              {/* Foto / Scan KTP */}
              <FormGroup>
                <Label required>Foto / Scan KTP</Label>
                <UploadBox
                  innerRef={register({
                    validate: {
                      required: (value: FileList) => {
                        return value.length > 0;
                      },
                      fileType: (value: FileList) => {
                        return validateFileType(value, ['image/png', 'image/jpeg']);
                      },
                      fileSize: (value: FileList) => {
                        return validateFileSize(value, 2048);
                      },
                    },
                  })}
                  onChange={(e, key, files) => {
                    if (files && files.length > 0 && key === 'drop') {
                      setValue('fotoScanKTP', files, { shouldValidate: formState.isSubmitted });
                    }
                  }}
                  placeholder={
                    <span>
                      <Icon name="camera" />
                    &nbsp;&nbsp;Unggah Foto/Scan KTP
                  </span>
                  }
                  label="Pilih file"
                  labelCaption="atau drag ke sini"
                  name="fotoScanKTP"
                  description={
                    getUploadBoxErrorMessage('fotoScanKTP')
                      ? undefined
                      : 'Besar maksimum file yang diizinkan adalah 2MB'
                  }
                  errorMessage={getUploadBoxErrorMessage('fotoScanKTP')}
                />
              </FormGroup>
            </Column>
            <Column col={[12, 12, 6]}>
              {/* Foto Diri */}
              <FormGroup>
                <Label required>Foto Diri</Label>
                <UploadBox
                  innerRef={register({
                    validate: {
                      required: (value: FileList) => {
                        return value.length > 0;
                      },
                      fileType: (value: FileList) => {
                        return validateFileType(value, ['image/png', 'image/jpeg']);
                      },
                      fileSize: (value: FileList) => {
                        return validateFileSize(value, 2048);
                      },
                    },
                  })}
                  onChange={(e, key, files) => {
                    if (files && files.length > 0 && key === 'drop') {
                      setValue('fotoDiri', files, { shouldValidate: formState.isSubmitted });
                    }
                  }}
                  placeholder={
                    <span>
                      <Icon name="camera" />
                    &nbsp;&nbsp;Unggah Foto Anda
                  </span>
                  }
                  label="Pilih file"
                  labelCaption="atau drag ke sini"
                  name="fotoDiri"
                  description={
                    getUploadBoxErrorMessage('fotoDiri')
                      ? undefined
                      : 'Besar maksimum file yang diizinkan adalah 2MB'
                  }
                  errorMessage={getUploadBoxErrorMessage('fotoDiri')}
                />
              </FormGroup>
            </Column>
          </Row>
        </form>

      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle} icon={{ name: 'times' }}>
          Tutup
          </Button>
        <Button variant="success" icon={{ name: 'save' }} onClick={onSaving} loading={loading}>
          Simpan Data
          </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDeleteMember;
