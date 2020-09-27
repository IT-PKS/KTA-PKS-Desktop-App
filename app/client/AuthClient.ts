
import initSQLite from '../services/sqlite/initSQLite';
import { User } from "../entity/User";
import { clientPost } from '../services/URLApi/URLApi';


export const clientTest = async () => {
    const connection = await initSQLite([User])

    const theUser = {
        "firstName": "Dodi",
        "lastName": "Prasetyo",
        "age": 22
    }
    const user = new User(theUser)

    await connection.manager.save(user)
    const users = await connection.manager.find(User)
    console.log("Loaded usersaa: ", users)
    connection.close()
}

export const _postAuthLogin = async (payload:object) => {
    return await clientPost('auth/login', payload);
}