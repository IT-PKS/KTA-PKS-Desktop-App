import * as sqlite from 'sqlite3';

// Assuming you have @types/sqlite3 installed
const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database('app/database/kta-pks.sql', (err) => {
    if (err) throw err;
    console.log("Database Connected!");
});


interface Row {
    info: string
}

// db.close();

export default db;