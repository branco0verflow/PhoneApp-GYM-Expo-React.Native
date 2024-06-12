import * as SQLite from 'expo-sqlite/legacy';
const dbName = "database.db"

const databaseConection = {
     getConnection() {
        return SQLite.openDatabase(dbName)
    },
    async checkTableExist(tx) {
        const res = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", []) 
        return res
    },
    async dropTable(tx) {
        const res = await tx.executeSqlAsync("DROP TABLE IF EXISTS users", [])
        return res
    },
    async createUserTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, userName VARCHAR(50), userApellido VARCHAR(50), email VARCHAR(50), password VARCHAR(20))", [])
        return res
    },
    async createUser(tx, userName, userApellido, email, password) {
        const res = await tx.executeSqlAsync("INSERT INTO users (userName, userApellido, email, password) VALUES (?, ?, ?, ?)", [userName, userApellido, email, password])
        console.log("Funciona (Insert correcto)", res)
        return res
    },
    async updateUser(tx, userName, userApellido, userEmail) {
        console.log("parametros", userName, userApellido, userEmail)
        const res = await tx.executeSqlAsync("UPDATE users SET userName = ?, userApellido = ?, email = ? WHERE userName = ?", [userName, userApellido, userEmail, userName]) 
        return res
    },
    async deleteUser(tx, userName) {
        const res = await tx.executeSqlAsync("DELETE FROM users WHERE userName = ?", [userName])
        return res
    },
    async getOneUser(tx, userName) {
        const res = await tx.executeSqlAsync("SELECT * FROM users WHERE userName = ?", [userName])
        return res
    },
    async getAllUsers(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM users", [])
        return res
    },
    async deleteAllUser(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM users", []) 
        return res
    }
}

export default databaseConection