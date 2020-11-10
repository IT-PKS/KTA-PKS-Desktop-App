
import initSQLite from '../services/sqlite/initSQLite';
import { User } from "../entity/User";
import { clientPost } from '../services/URLApi/URLApi';
import sha256 from 'js-sha256';


export const addLocalUser = async (param: any) => {
    const connection: any = await initSQLite([User])

    let theUser = {
        "email": "root@admin.com",
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

export const updatePasswordLocal = async (payload: any) => {
    try {
        const connection: any = await initSQLite([User])
        let userToUpdate = await connection.manager.findOne(User, { email: payload.email });
        userToUpdate.password = sha256(payload.password);
        return await connection.manager.save(userToUpdate);
    } catch (error) {
        console.log(error)
    }
}

export const loginLocal = async (payload: any) => {
    try {
        const connection: any = await initSQLite([User])
        const user = await connection.manager.find(User, { where: { email: payload.email, password: sha256(payload.password) } });
        if (user.length) {
            return true
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const serialKey = async () => {
    const connection: any = await initSQLite([User])
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