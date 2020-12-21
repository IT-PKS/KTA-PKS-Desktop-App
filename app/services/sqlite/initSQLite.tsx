import { createConnection, getConnectionManager } from "typeorm";
import { remote } from 'electron'
import { log } from "console";
const { app } = remote

// Models
import { User } from '../../entity/User'
import { Gender } from '../../entity/Gender'
import { Religion } from '../../entity/Religion'
import { Occupation } from '../../entity/Occupation'
import { Education } from '../../entity/Education'
import { MaritalStatus } from '../../entity/MaritalStatus'
import { Blood } from '../../entity/Blood'
import { Country } from '../../entity/Country'
import { Province } from '../../entity/Province'
import { City } from '../../entity/City'
import { District } from '../../entity/District'
import { SubDistrict } from '../../entity/SubDistrict'
import { Member } from '../../entity/Member'

const initSQLite = async () => {
    try {
        const connection = await createConnection({
            "name": "pks-db",
            "type": "sqlite",
            // "database": "app/database/kta-pks.sql",//"app/database/kta-pks.sql", //app.getPath('userData') + "/databases/kta-pks.sql"
            "database": app.getPath('userData') + "/databases/kta-pks.sql",
            "synchronize": true,
            "logging": false,
            "entities": [
                User,
                Gender,
                Religion,
                Occupation,
                Education,
                MaritalStatus,
                Blood,
                Country,
                Province,
                City,
                District,
                SubDistrict,
                Member
            ]
        })
        console.log("🚀 ~ file: initSQLite.tsx ~ line 34 ~ initSQLite ~ path", app.getPath('userData') + "/databases/kta-pks.sql")
        return connection
    } catch (error) {
        if (error.name === "AlreadyHasActiveConnectionError") {
            const existentConn = getConnectionManager().get("pks-db");
            return existentConn;
        }
    }

}

export default initSQLite
