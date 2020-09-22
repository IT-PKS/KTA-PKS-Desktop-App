
import initSQLite from '../services/sqlite/initSQLite'
import { User } from "../entity/User";

export const clientTest = async () => {
    const connection = await initSQLite([User])
    console.log("clientTest -> connection", connection)

    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25

    await connection.manager.save(user)
    const users = await connection.manager.find(User)
    console.log("Loaded usersaa: ", users)
}