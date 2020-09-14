// const rootDir = process.env.NODE_ENV === "development" ?
//     "src" :
//     "build"
const rootDir = 'dist'
module.exports = {
    "type": "sqlite",
    "database": "app/database/kta-pks.sql",
    "synchronize": true,
    "logging": false,
    "entities": [__dirname + "src/entity/**/*.{js,ts}"],
    "migrations": [rootDir + "/migration/*.{js,ts}"],
    "subscribers": [rootDir + "/subscriber/**/*.{js,ts}"],
    "seeds": [rootDir + "/migration/seeds/**/*.{js,ts}"],
    "factories": [rootDir + "/migration/factories/**/*.{js,ts}"]
}