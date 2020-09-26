import { createConnection } from "typeorm";

const initSQLite = async (Entity: any) => {
    const connection = await createConnection({
        "type": "sqlite",
        "database": "app/database/kta-pks.sql",
        "synchronize": true,
        "logging": false,
        "entities": [...Entity]
    })
    return connection
}

export default initSQLite