import { clientGet } from '../services/URLApi/URLApi';

export const getRingkasan = async () => {
    return await clientGet('admin/dashboard/data', {});
};
