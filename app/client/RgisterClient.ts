
import initSQLite from '../services/sqlite/initSQLite'
import { Member } from "../entity/Member";

export const saveToLocal = async () => {

    const sqlite = await initSQLite([Member])
    const payload = {}
    const member = new Member(payload)
    await sqlite.manager.save(member)

    sqlite.close()
}