import * as SQLite from 'expo-sqlite/legacy';
const dbName = "database.db"

const databaseConection = {
    getConnection() {
        return SQLite.openDatabase(dbName);
    },
    async checkTableExist(tx) {
        const res = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", []);
        return res;
    },
    async dropTable(tx) {
        const res = await tx.executeSqlAsync("DROP TABLE IF EXISTS users", []);
        return res;
    },
    async createUserTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, userName VARCHAR(50), userApellido VARCHAR(50), cedula VARCHAR(20), fechaNacimiento VARCHAR(20))", []);
        return res;
    },
    async createUser(tx, userName, userApellido, cedula, fechaNacimiento) {
        const res = await tx.executeSqlAsync("INSERT INTO users (userName, userApellido, cedula, fechaNacimiento) VALUES (?, ?, ?, ?)", [userName, userApellido, cedula, fechaNacimiento]);
        console.log("Funciona (Insert correcto)", res);
        return res;
    },
    async updateUser(tx, userName, userApellido, cedula, fechaNacimiento) {
        const res = await tx.executeSqlAsync("UPDATE users SET userName = ?, userApellido = ?, cedula = ?, fechaNacimiento = ? WHERE userName = ?", [userName, userApellido, cedula, fechaNacimiento, userName]);
        return res;
    },
    async deleteUser(tx, userName) {
        const res = await tx.executeSqlAsync("DELETE FROM users WHERE userName = ?", [userName]);
        return res;
    },
    async getOneUser(tx, userName) {
        const res = await tx.executeSqlAsync("SELECT * FROM users WHERE userName = ?", [userName]);
        console.log("GET ONE USER TIENE", res)
        return res;
    },
    async getAllUsers(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM users", []);
        return res;
    },
    async deleteAllUser(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM users", []);
        return res;
    }
}

export default databaseConection
