import { clientGet } from '../services/URLApi/URLApi';

export const getGenders = async () => {
    return await clientGet('drop-down/gender', {});
};

export const getBloodType = async () => {
    return await clientGet('drop-down/blood-type', {});
};

export const getCountries = async () => {
    return await clientGet('drop-down/place/countries', {});
};

export const getProvinces = async () => {
    return await clientGet('drop-down/place/provinces', {});
};

export const getCities = async (provincyId: string) => {
    return await clientGet(`drop-down/place/provinces/${provincyId}/cities`, {});
};

export const getDistricts = async (cityId: string) => {
    return await clientGet(`drop-down/place/cities/${cityId}/districts`, {});
};

export const getSubDistricts = async (districtId: string) => {
    return await clientGet(`drop-down/place/districts/${districtId}/sub-districts`, {});
};

export const getReligions = async () => {
    return await clientGet(`drop-down/religion`, {});
};

export const getOccupations = async () => {
    return await clientGet(`drop-down/occupation`, {});
};

export const getEducations = async () => {
    return await clientGet(`drop-down/education`, {});
};

export const getMarital = async () => {
    return await clientGet(`drop-down/marital`, {});
};
