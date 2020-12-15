
import { clientGet, clientPost } from '../services/URLApi/URLApi';

export const getListUnverifiedMembers = async (payload: object) => {
  return await clientGet('admin/members/validation-list', payload)
}

export const getListdMembers = async (payload: object) => {
  return await clientGet('admin/members/list', payload)
}

export const postVerifiedMembers = async (payload: object) => {
  return await clientPost('admin/members/validation-status', payload)
}

export const postEditMembers = async (payload: object) => {
  return await clientPost('admin/members/edit', payload)
}