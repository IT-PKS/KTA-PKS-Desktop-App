import React, {useState} from 'react';
import PersonalData from '../staticPage/PersonalData/PersonalData';
import { postMembersRegistration } from '../../client/RegisterClient';
const Home: React.FC = () => {
  const [state, setstate] = useState('default')

  const _hanldeOnSubmit = async(payload:any) => {

    let dataFile = new FormData();
    dataFile.append('fullname', payload.namaLengkap);
    dataFile.append('nickname', payload.namaPanggilan);
    dataFile.append('birthdate', payload.tanggalLahir);
    dataFile.append('birthplace', payload.tempatLahir);
    dataFile.append('id_card', payload.nik);
    dataFile.append('gender', payload.jenisKelamin);
    dataFile.append('identity_type', 'KTP');
    dataFile.append('religion', payload.agama);
    dataFile.append('marital_status', payload.statusPerkawinan);
    dataFile.append('job', payload.pekerjaan);
    dataFile.append('last_education', payload.pendidikanTerakhir);
    dataFile.append('blood_type', payload.golonganDarah);
    dataFile.append('country_id', payload.negaraSaatIni);
    dataFile.append('province_id', payload.provinsi);
    dataFile.append('city_id', payload.kotaKabupaten);
    dataFile.append('district_id', payload.kecamatan);
    dataFile.append('sub_district', payload.kelurahanDesa);
    dataFile.append('address', payload.alamat);
    dataFile.append('domicile', payload.alamatSaatIni);
    dataFile.append('lat', payload.alamatSaatIniLatLng.split(',')[0]);
    dataFile.append('lon', payload.alamatSaatIniLatLng.split(',')[1]);
    dataFile.append('email', payload.email);
    dataFile.append('organization_id', '1');
    dataFile.append('ktp', payload.fotoScanKTP[0]);
    dataFile.append('profile', payload.fotoDiri[0]);
    console.log("_hanldeOnSubmit -> payload.fotoScanKTP[0].path", payload.fotoScanKTP[0]);

    console.log("_hanldeOnSubmit -> payload", payload)
    console.log("_hanldeOnSubmit -> dataFile", dataFile)
    const res = await postMembersRegistration(dataFile)
    console.log("_hanldeOnSubmit -> res", res)
  };
 
  return (
    <>
      <PersonalData state={state} _hanldeOnSubmit={_hanldeOnSubmit}/>
    </>
  );
};

export default Home;
