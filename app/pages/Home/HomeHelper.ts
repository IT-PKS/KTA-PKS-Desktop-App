export const normalizePayload = (payload: any) => {
  const birthdate = payload.tanggalLahir.split('/');

  const dataFile = new FormData();
  dataFile.append('fullname', payload.namaLengkap);
  dataFile.append('nickname', payload.namaPanggilan);
  dataFile.append('birthdate', `${birthdate[2]}/${birthdate[1]}/${birthdate[0]}`);
  dataFile.append('birthplace', payload.tempatLahir);
  dataFile.append('id_card', payload.nik);
  dataFile.append('gender', payload.jenisKelamin);
  dataFile.append('identity_type', '1');
  dataFile.append('religion', payload.agama);
  dataFile.append('marital_status', payload.statusPerkawinan);
  dataFile.append('job', payload.pekerjaan);
  dataFile.append('last_education', payload.pendidikanTerakhir);
  dataFile.append('blood_type', payload.golonganDarah);
  dataFile.append('country_id', payload.negaraSaatIni || 0);
  dataFile.append('province_id', payload.provinsi);
  dataFile.append('city_id', payload.kotaKabupaten);
  dataFile.append('district_id', payload.kecamatan);
  dataFile.append('sub_district_id', payload.kelurahanDesa);
  dataFile.append('address', payload.alamat + " RT " + payload.rt + " RW " + payload.rw);
  dataFile.append('domicile', payload.alamatSaatIni);
  dataFile.append('lat', payload.alamatSaatIniLatLng.split(',')[0]);
  dataFile.append('lon', payload.alamatSaatIniLatLng.split(',')[1]);
  dataFile.append('email', payload.email);
  // dataFile.append('organization_id', '1');
  dataFile.append('ktp', payload.fotoScanKTP[0]);
  dataFile.append('profile', payload.fotoDiri[0]);

  const payloadRest = dataFile;

  const payloadLocal: any = {};
  dataFile.forEach((value, key) => { payloadLocal[key] = value; });
  payloadLocal['ktp'] = payload.fotoScanKTP[0].name;
  payloadLocal['profile'] = payload.fotoDiri[0].name;

  return { payloadRest, payloadLocal };
};
