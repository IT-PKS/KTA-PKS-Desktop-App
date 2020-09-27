import initSQLite from '../services/sqlite/initSQLite';
import { Member } from "../entity/Member";
import { clientPost } from '../services/URLApi/URLApi';

export const saveToLocal = async () => {
    const sqlite = await initSQLite([Member])
    const payload = {}
    const member = new Member(payload)
    await sqlite.manager.save(member)
    sqlite.close()
}

export const postMembersRegistration = async (payload:object) => {
    return await clientPost('members/registration', payload)
}