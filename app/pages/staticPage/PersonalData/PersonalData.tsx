/** @jsx jsx */
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Global, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../../components/base/src/theme';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ValueType } from 'react-select';
import isNull from 'lodash/isNull';

import Card from '../../../components/deskstop/Card/Card';

import formHelper, {
  RegisterFormData,
  SelectOption,
  SelectKeys,
  ErrorMessageKeys,
} from '../../../components/base/src/staticPages/Register/Register.formHelper';

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

import createStyles from './PersonalData.styles';

// Components
import {
  Button,
  Checkbox,
  Column,
  FormErrorMessage,
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
} from 'kta-ui-components';

import RegisterFailed from '../../../components/base/src/staticPages/Register/RegisterFailed';
import RegisterSuccess from '../../../components/base/src/staticPages/Register/RegisterSuccess';

// Utils
import { isPossiblyNumber, validateFileType, validateFileSize } from '../../../components/base/src/utils';

type iProps = {
  defaultValues?: { [K in keyof RegisterFormData]?: RegisterFormData[K] };
  state?: 'default' | 'success' | 'failed';
  onSubmit(): any;
  /** @default false */
  loading?: boolean;
  setState(value: any): any;
};


const PersonalData: React.FC<iProps> = props => {
  const { defaultValues, state = 'default', onSubmit, loading, setState } = props;
  const { register, handleSubmit, errors, setValue, formState } = useForm<RegisterFormData>({
    defaultValues,
  });

  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const { errorMessages, pattern } = formHelper;

  const [jenisKelamin, setJenisKelamin] = React.useState<any | []>([])
  const [golonganDarah, setGolonganDarah] = React.useState<any | []>([])
  const [provinsi, setProvinsi] = React.useState<any | []>([])
  const [kotaKabupaten, setKotaKabupaten] = React.useState<any | []>([])
  const [kecamatan, setKecamatan] = React.useState<any | []>([])
  const [kelurahanDesa, setKelurahanDesa] = React.useState<any | []>([])
  const [negaraSaatIni, setNegaraSaatIni] = React.useState<any | []>([])
  const [agama, setAgama] = React.useState<any | []>([])
  const [statusPerkawinan, setStatusPerkawinan] = React.useState<any | []>([])
  const [pekerjaan, setPekerjaan] = React.useState<any | []>([])
  const [pendidikanTerakhir, setPendidikanTerakhir] = React.useState<any | []>([])

  const [provinsiValue, setProvinsiValue] = React.useState<string | null>(null);
  const [kotaKabupatenValue, setKotaKabupatenValue] = React.useState<string | null>(null);
  const [kecamatanValue, setKecamatanValue] = React.useState<string | null>(null);
  const [kelurahanDesaValue, setKelurahanDesaValue] = React.useState<string | null>(null);

  const normalizeDropdown = (arrayObj: any, keyValue: string) => {
    for (let i = 0; i < arrayObj.length; i++) {
      arrayObj[i].label = arrayObj[i][keyValue];
      arrayObj[i].value = arrayObj[i]['id'];
    }
    return arrayObj;
  };

  const _handleGetGenders = async () => {
    const { data: jenisKelamin } = await getGenders();
    setJenisKelamin(normalizeDropdown(jenisKelamin, 'gender'));
  }

  const _handleGetCountries = async () => {
    const { data: countries } = await getCountries();
    setNegaraSaatIni(normalizeDropdown(countries, 'name'),);
  }

  const _handleGetProvinces = async () => {
    const { data: provinsi } = await getProvinces();
    setProvinsi(normalizeDropdown(provinsi, 'name'),);
  }

  const _handleGetReligions = async () => {
    const { data: agama } = await getReligions();
    setAgama(normalizeDropdown(agama, 'religion'));
  }

  const _handleGetOccupations = async () => {
    const { data: pekerjaan } = await getOccupations();
    setPekerjaan(normalizeDropdown(pekerjaan, 'occupation'));
  }

  const _handleGetEducations = async () => {
    const { data: pendidikanTerakhir } = await getEducations();
    setPendidikanTerakhir(normalizeDropdown(pendidikanTerakhir, 'education'));
  }

  const _handleGetMarital = async () => {
    const { data: statusPerkawinan } = await getMarital();
    setStatusPerkawinan(normalizeDropdown(statusPerkawinan, 'status'));
  }

  const _handleGetBloodType = async () => {
    const { data: golonganDarah } = await getBloodType();
    setGolonganDarah(normalizeDropdown(golonganDarah, 'blood'));
  }

  const _hanldeGetCities = async (provincyId: string) => {
    const { data: kotaKabupaten } = await getCities(provincyId);
    setKotaKabupaten(normalizeDropdown(kotaKabupaten, 'name'));
  }

  const _hanldeGetDistricts = async (cityId: string) => {
    const { data: kecamatan } = await getDistricts(cityId);
    setKecamatan(normalizeDropdown(kecamatan, 'name'));
  }

  const _hanldeGetSubDistricts = async (districtId: string) => {
    const { data: kelurahanDesa } = await getSubDistricts(districtId);
    setKelurahanDesa(normalizeDropdown(kelurahanDesa, 'name'));
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
    const currValue = defaultValues && defaultValues[key];

    if (currValue) {
      selectedOption = options[key].filter(option => option.value === currValue);
    }

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

  const getChildren = () => {
    if (state === 'failed') {
      return <RegisterFailed onResend={() => onSubmit} />;
    }
    if (state === 'success') {
      return <RegisterSuccess onNewForm={() => setState('default')} />;
    }
    return (
      <form css={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Data Diri */}
        <h2 css={[styles.heading, styles.headingFirst]}>Data Diri</h2>

        {/* NIK / No. KTP */}
        <FormGroup>
          <Label required>NIK / No. KTP</Label>
          <InputMask
            innerRef={register({
              validate: {
                required: value => isPossiblyNumber(value),
              },
            })}
            mask={numberMask}
            name="nik"
            errorMessage={
              errors.nik && errors.nik.type === 'required' && errorMessages.nik.required
            }
            type="text"
            placeHolder="Nomer Induk Kependudukan anda"
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
                placeHolder="Sesuai tertera di KTP"
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
                placeHolder="Akrab dipanggil dengan nama..."
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
                placeHolder="Nama kota"
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
                placeHolder="Dalam format dd/mm/yyyy"
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
                defaultValue={getSelectDefaultValue('jenisKelamin')}
                onChange={handleSelectOnChange('jenisKelamin')}
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
                placeholder="A / B / AB / O"
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
                  if (selectedOption && 'value' in selectedOption) {
                    setProvinsiValue(selectedOption.value);
                  }
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
                  if (selectedOption && 'value' in selectedOption) {
                    setKotaKabupatenValue(selectedOption.value);
                  }
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
                    setKecamatanValue(selectedOption.value);
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
                  if (selectedOption && 'value' in selectedOption) {
                    setKelurahanDesaValue(selectedOption.value);
                  }
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
                placeHolder="Contoh: Jalan A Perum B No. 1111"
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
                    required: value => isPossiblyNumber(value),
                  },
                })}
                mask={numberMask}
                name="rt"
                errorMessage={
                  errors.rt && errors.rt.type === 'required' && errorMessages.rt.required
                }
                type="text"
                placeHolder="RT"
              />
            </FormGroup>
          </Column>
          <Column col={[12, 6, 3]}>
            {/* RW */}
            <FormGroup>
              <Label required>RW</Label>
              <InputMask
                innerRef={register({
                  validate: value => isPossiblyNumber(value),
                })}
                mask={numberMask}
                name="rw"
                errorMessage={errors.rw && errorMessages.rw.required}
                type="text"
                placeHolder="RW"
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
            placeHolder="Isi apabila saat ini anda tidak tinggal di alamat yang tertera pada KTP"
            css={styles.alamatTextarea}
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
            onChange={handleSelectOnChange('negaraSaatIni')}
            innerRef={() => register({ name: 'negaraSaatIni' })}
            errorMessage={errors.negaraSaatIni && errors.negaraSaatIni.message}
            placeholder="Pilih Negara"
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
                onChange={handleSelectOnChange('agama')}
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
                onChange={handleSelectOnChange('statusPerkawinan')}
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
                onChange={handleSelectOnChange('pekerjaan')}
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
                onChange={handleSelectOnChange('pendidikanTerakhir')}
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
                placeHolder="Contoh: email@website.com"
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
                    required: value => isPossiblyNumber(value),
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
                placeHolder="Contoh: 080011112222"
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
        {/* Kirim Data */}
        <div css={styles.button_section}>
          <Button icon={{ name: 'paper-plane' }} type="submit" loading={loading}>
            Kirim Data
          </Button>
        </div>
      </form>
    );
  };

  return (
    <Fragment>
      <Card transparent>
        <div>
          <Button icon={{ name: 'user-plus' }} type="submit" style={{ width: '211px', height: '51px' }}>
            Tambah Satu Data
          </Button>
          <Button variant="light" icon={{ name: 'users' }} type="submit" style={{ width: '211px', height: '51px', marginLeft: '10px' }}>
            Tambah Banyak Data
        </Button>
        </div>

        <div css={[styles.white__card__custom]}>
          {/* Form */}
          {getChildren()}
        </div>
      </Card>
    </Fragment>
  )
}

export default PersonalData
