import initSQLite from '../services/sqlite/initSQLite';
import { Member } from "../entity/Member";
import { clientPost } from '../services/URLApi/URLApi';

export const saveToLocal = async (payload: any) => {
    const sqlite = await initSQLite([Member])
    try {
        const member = new Member(payload)
        const res = await sqlite.manager.save(member)
        sqlite.close()
        return res
    } catch (error) {
        sqlite.close()
        throw error
    }
}

export const postMembersRegistration = async (payload: object) => {
    return await clientPost('members/registration', payload)
}