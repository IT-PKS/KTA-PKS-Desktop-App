import { createConnection } from "typeorm";
import { User } from "../../entity/User";

const initializeSQLite = async () => {
    const connection = await createConnection({
        "type": "sqlite",
        "database": "app/database/kta-pks.sql",
        "synchronize": true,
        "logging": false,
        "entities": [User]
    })
    return connection
}

export default initializeSQLite
