import React, { useState } from 'react';
import PersonalData from '../staticPage/PersonalData/PersonalData';
import { postMembersRegistration, saveToLocal } from '../../client/RegisterClient';
import { normalizePayload } from './HomeHelper';
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
} from '../../client/AdminClient';
import useDidMount from '../../components/base/src/utils/hooks/useDidMount'

const Home: React.FC = () => {
  const [state, setState] = useState<string | null>('default');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    jenisKelamin: [],
    golonganDarah: [],
    provinsi: [],
    kotaKabupaten: [],
    kecamatan: [],
    kelurahanDesa: [],
    negaraSaatIni: [],
    agama: [],
    statusPerkawinan: [],
    pekerjaan: [],
    pendidikanTerakhir: [],
  });

  const _hanldeOnSubmit = async (payload: any) => {
    setLoading(false);

    const { payloadRest, payloadLocal } = normalizePayload(payload);

    const reslocal = await saveToLocal(payloadLocal);
    const res = await postMembersRegistration(payloadRest);

    if (reslocal && res.message === 'Success') {
      setLoading(true);
      setState('success');
    } else {
      setLoading(true);
    }
  };

  const normalizeDropdown = (arrayObj: any, keyValue: string) => {
    for(let i = 0; i < arrayObj.length; i++){
      arrayObj[i].label = arrayObj[i][keyValue];
      arrayObj[i].value = arrayObj[i]['id'];
    }
    return arrayObj;
  };

  const _handleGetDropdown = async () => {
    const { data: jenisKelamin } = await getGenders();
    const { data: provinsi } = await getProvinces();
    const { data: kotaKabupaten } = await getCities();
    const { data: kecamatan } = await getDistricts();
    const { data: kelurahanDesa } = await getSubDistricts();
    const { data: agama } = await getReligions();
    const { data: pekerjaan } = await getOccupations();
    const { data: pendidikanTerakhir } = await getEducations();
    const { data: statusPerkawinan } = await getMarital();
    const { data: golonganDarah } = await getBloodType();

    setOptions({
      jenisKelamin: normalizeDropdown(jenisKelamin, 'gender'),
      golonganDarah: normalizeDropdown(golonganDarah, 'blood'),
      provinsi: normalizeDropdown(provinsi, 'name'),
      kotaKabupaten: normalizeDropdown(kotaKabupaten, 'name'),
      kecamatan: normalizeDropdown(kecamatan, 'name'),
      kelurahanDesa: normalizeDropdown(kelurahanDesa, 'name'),
      agama: normalizeDropdown(agama, 'religion'),
      statusPerkawinan: normalizeDropdown(statusPerkawinan, 'status'),
      pekerjaan: normalizeDropdown(pekerjaan, 'occupation'),
      pendidikanTerakhir: normalizeDropdown(pendidikanTerakhir, 'education'),
    });

  };

  useDidMount(() => {
    _handleGetDropdown();
  });

  return (
    <>
      <PersonalData
        state={state}
        setState={setState}
        onSubmit={_hanldeOnSubmit}
        loading={loading}
        options={options}
      />
    </>
  );
};

export default Home;
