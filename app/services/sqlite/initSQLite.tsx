import { createConnection, getConnectionManager } from "typeorm";
import { Gender } from '../../entity/Gender'
import { remote } from 'electron'
import { log } from "console";
const { app } = remote

const initSQLite = async (Entity: any) => {
    try {
        console.log(app.getPath('userData') + "/databases/kta-pks.sql");
        console.log(app.getAppPath());


        const connection = await createConnection({
            "name": "pks-db",
            "type": "sqlite",
            // "database": "app/database/kta-pks.sql",//"app/database/kta-pks.sql", //app.getPath('userData') + "/databases/kta-pks.sql"
            "database": app.getPath('userData') + "/databases/kta-pks.sql",
            "synchronize": true,
            "logging": false,
            "entities": [...Entity]
        })
        return connection
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        if (error.name === "AlreadyHasActiveConnectionError") {
            const existentConn = getConnectionManager().get("pks-db");
            return existentConn;
        }
    }

}

export default initSQLite
