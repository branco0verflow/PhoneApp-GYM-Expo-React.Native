import * as SQLite from 'expo-sqlite/legacy';

const dbName = "database.db";

const databaseConection = {
    getConnection() {
        return SQLite.openDatabase(dbName);
    },

    async checkTableExist(tx) {
        const userTable = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", []);
        const tipoMaquinaTable = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='TipoMaquina'", []);
        return { userTable, tipoMaquinaTable };
    },

    async dropTable(tx) {
        const dropUsers = await tx.executeSqlAsync("DROP TABLE IF EXISTS users", []);
        const dropTipoMaquina = await tx.executeSqlAsync("DROP TABLE IF EXISTS TipoMaquina", []);
        return { dropUsers, dropTipoMaquina };
    },

    async createUserTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, userName VARCHAR(50), userApellido VARCHAR(50), cedula VARCHAR(20), fechaNacimiento VARCHAR(20))", []);
        return res;
    },

    async createTipoMaquinaTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS TipoMaquina(id INTEGER PRIMARY KEY AUTOINCREMENT, NombreTM VARCHAR(50), imagenUrlTipoM VARCHAR(100))", []);
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
        console.log("GET ONE USER TIENE", res);
        return res;
    },

    async getAllUsers(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM users", []);
        return res;
    },

    async deleteAllUser(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM users", []);
        return res;
    },

    async createTipoMaquina(tx, NombreTM, imagenUrlTipoM) {
        const res = await tx.executeSqlAsync("INSERT INTO TipoMaquina (NombreTM, imagenUrlTipoM) VALUES (?, ?)", [NombreTM, imagenUrlTipoM]);
        console.log("Funciona (Insert correcto)", res);
        return res;
    },

    async updateTipoMaquina(tx, NombreTM, imagenUrlTipoM) {
        const res = await tx.executeSqlAsync("UPDATE TipoMaquina SET NombreTM = ?, imagenUrlTipoM = ? WHERE NombreTM = ?", [NombreTM, imagenUrlTipoM, NombreTM]);
        return res;
    },

    async deleteTipoMaquina(tx, NombreTM) {
        const res = await tx.executeSqlAsync("DELETE FROM TipoMaquina WHERE NombreTM = ?", [NombreTM]);
        return res;
    },

    async getOneTipoMaquina(tx, NombreTM) {
        const res = await tx.executeSqlAsync("SELECT * FROM TipoMaquina WHERE NombreTM = ?", [NombreTM]);
        console.log("GET ONE TipoMaquina TIENE", res);
        return res;
    },

    async getAllTipoMaquina(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM TipoMaquina", []);
        return res;
    },

    async deleteAllTipoMaquina(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM TipoMaquina", []);
        return res;
    }
};

export default databaseConection

