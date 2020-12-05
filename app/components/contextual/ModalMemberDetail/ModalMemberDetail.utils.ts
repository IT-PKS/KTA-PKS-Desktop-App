import { ReduxState } from 'kta';

type DataType = ReduxState['modal']['memberDetail']['data'];
export type RequiredDataType = Exclude<DataType, undefined>;

export const getLabel = (key: keyof RequiredDataType | 'birthplace_birthdate' | 'lat_lon') => {
  switch (key) {
    case 'id_card':
      return 'NIK / No.KTP';
    case 'fullname':
      return 'Nama Lengkap';
    case 'nickname':
      return 'Nama Panggilan';
    case 'birthplace':
      return 'Tempat Lahir';
    case 'birthdate':
      return 'Tanggal Lahir';
    case 'birthplace_birthdate':
      return 'Tempat, Tanggal Lahir';
    case 'gender':
      return 'Jenis Kelamin';
    case 'blood_type':
      return 'Golongan Darah';
    case 'province':
      return 'Provinsi';
    case 'city':
      return 'Kota / Kabupaten';
    case 'district':
      return 'Kecamatan';
    case 'sub_district':
      return 'Kelurahan / Desa';
    case 'address':
      return 'Alamat';
    case 'lat':
      return 'Latitude';
    case 'lon':
      return 'Longitude';
    case 'lat_lon':
      return 'Latitude, Longitude';
    case 'domicile':
      return 'Alamat Saat Ini';
    case 'country':
      return 'Negara Saat Ini';
    case 'religion':
      return 'Agama';
    case 'marital_status':
      return 'Status Perkawinan';
    case 'job':
      return 'Pekerjaan';
    case 'last_education':
      return 'Pendidikan Terakhir';
    case 'email':
      return 'Email';
    case 'phone':
      return 'No. Telp / HP / WhatsApp';
    default:
      return 'No Label';
  }
};

export const convertRawImg = (arr: ArrayBuffer) => {
  return btoa(new Uint8Array(arr).reduce((data, byte) => data + String.fromCharCode(byte), ''));
};
