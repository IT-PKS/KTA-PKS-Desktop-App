
import { clientGet, clientPost } from '../services/URLApi/URLApi';

export const getListUnverifiedMembers = async () => {
  return await clientGet('admin/members/validation-list', {});
};

export const postVerifiedMembers = async (payload: object) => {
  return await clientPost('admin/members/validation-status', payload);
};
