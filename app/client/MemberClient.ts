
import { clientGet, clientPost } from '../services/URLApi/URLApi';

export const getListUnverifiedMembers = async (payload: object) => {
  return await clientGet('admin/members/validation-list', payload);
};

export const postVerifiedMembers = async (payload: object) => {
  return await clientPost('admin/members/validation-status', payload);
};
