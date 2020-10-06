import { clientGet } from '../services/URLApi/URLApi';

export const getGenderList = async () => {
    return await clientGet('admin/gender/list', {});
}