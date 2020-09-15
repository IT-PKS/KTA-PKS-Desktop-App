
import initializeSQLite from '../services/sqlite/initializeSQLite'
import { User } from "../entity/User";

export const clientTest = async () => {
    const connection = await initializeSQLite([User])

    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25

    await connection.manager.save(user)
    const users = await connection.manager.find(User)
    console.log("Loaded usersaa: ", users)
}