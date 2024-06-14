import { useEffect } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import MyButton from "../../components/MyButton";
import databaseConection from "../../database/database-manager";
import OpenDatabase from "../../database/import-database";
import { LinearGradient } from "expo-linear-gradient";

const db = databaseConection.getConnection();

const HomeTipoMaquina = ({ navigation }) => {
  useEffect(() => {
    const init = async () => {
      const readOnly = false;
      await db.transactionAsync(async (tx) => {
        console.log("transaction", tx);
        const tableExist = await databaseConection.checkTableExist(tx);
        console.log("User table exists:", tableExist.userTable.rows.length > 0);
        console.log("TipoMaquina table exists:", tableExist.tipoMaquinaTable.rows.length > 0);

        if (tableExist.userTable.rows.length > 0) {
          console.log("User table exists");
          // await databaseConection.dropTable(tx) // Uncomment this if you want to drop the table
        }

        if (tableExist.tipoMaquinaTable.rows.length > 0) {
          console.log("TipoMaquina table exists");
          // await databaseConection.dropTable(tx) // Uncomment this if you want to drop the table
        }

        const result = await databaseConection.createTipoMaquinaTable(tx);
        console.log("### results ####", result);
      }, readOnly);
    };

    init().then(() => console.log("exec"));
  }, []);

  const clearDB = async () => {
    const readOnly = false;
    await db.transactionAsync(async (tx) => {
      databaseConection.deleteAllUser(tx);
    }, readOnly);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#154360", "#06212A"]} // Azul oscuro a azul más oscuro
        style={styles.viewContainer}
      >
        <View style={styles.generalView}>
          <View style={styles.internalView}>
            <ScrollView style={styles.scollview}>
              {/* button add user*/}
              <MyButton
                onPress={() => navigation.navigate("RegisterTipoMaquina")}
                title="Crear Tipos de Máquinas"
                iconName="user-plus"
                btnColor="blue"
              />

              {/* button update user */}
              <MyButton
                onPress={() => navigation.navigate("UpdateUser")}
                title="Actualizar Usuario"
                iconName="user-circle"
                btnColor="green"
              />

              {/* button delete user*/}
              <MyButton
                onPress={() => navigation.navigate("DeleteUser")}
                title="Borrar Usuario"
                iconName="user-times"
                btnColor="brown"
              />

              {/* button user */}
              <MyButton
                onPress={() => navigation.navigate("ViewUser")}
                title="Ver Usuario"
                iconName="user-times"
                btnColor="purple"
              />

              {/* button list user*/}
              <MyButton
                onPress={() => navigation.navigate("VerTodosTiposMaquina")}
                title="Todos los Tipos de Máquinas"
              />

              {/* borrar db */}
              <MyButton
                onPress={clearDB}
                title="Borrar DB"
                iconName="remove"
                btnColor="red"
              />

              {/* Importar db */}
              <MyButton
                onPress={() => OpenDatabase("database.db")}
                title="Importar DB"
                iconName="add"
                btnColor="gray"
              />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  viewContainer: {
    flex: 1,
    alignContent: "center",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
  internalView: {
    flex: 1,
    justifyContent: "center",
  },
  scollview: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    margin: 10,
  },
});

export default HomeTipoMaquina;