import { createConnection, getConnectionManager } from "typeorm";

const initSQLite = async (Entity: any) => {
    try {
        const connection = await createConnection({
            "name": "pks-db",
            "type": "sqlite",
            "database": "app/database/kta-pks.sql",
            "synchronize": true,
            "logging": false,
            "entities": [...Entity]
        })
        return connection
    } catch (error) {
        if (error.name === "AlreadyHasActiveConnectionError") {
            const existentConn = getConnectionManager().get("pks-db");
            return existentConn;
        }
    }

}

export default initSQLite
