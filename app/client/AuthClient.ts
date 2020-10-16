
import initSQLite from '../services/sqlite/initSQLite';
import { User } from "../entity/User";
import { clientPost } from '../services/URLApi/URLApi';


export const addLocalUser = async (param: any) => {
    const connection: any = await initSQLite([User])

    let theUser = {
        "email": "bakti@admin.com",
        "firstName": "Bakti",
        "lastName": "Pratama",
        "password": "tes",
        "serialKey": param.license || "LSHDTCRWHSKTYUHS"
    }
    const user = new User(theUser)

    await connection.manager.save(user)
    // const users = await connection.manager.find(User)
    connection.close()
    return user
}

export const serialKey = async () => {
    const connection = await initSQLite([User])
    const user = await connection.manager.find(User)
    try {
        const res = user.length ? user[0].serialKey : ''
        return res
    } catch (error) {
        throw error
    }
}

export const _postAuthLogin = async (payload: object) => {
    return await clientPost('auth/login', payload);
}