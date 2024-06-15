import { useEffect } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import MyButton from "../../components/MyButton";
import databaseConection from "../../database/database-manager";
import { LinearGradient } from "expo-linear-gradient";

const db = databaseConection.getConnection();

const HomeMaquina = ({ navigation }) => {
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
          // await databaseConection.dropTable(tx) 
        }

        if (tableExist.tipoMaquinaTable.rows.length > 0) {
          console.log("TipoMaquina table exists");
          // await databaseConection.dropTable(tx) 
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
              {/* crear*/}
              <MyButton
                onPress={() => navigation.navigate("RegisterTipoMaquina")}
                title="Crear Máquinas"
                iconName="user-plus"
                btnColor="blue"
              />

              {/* Modificar */}
              <MyButton
                onPress={() => navigation.navigate("ModificarTipoMaquina")}
                title="Modificar Máquinas"
                iconName="user-circle"
                btnColor="green"
              />

              {/* Elimiar */}
              <MyButton
                onPress={() => navigation.navigate("EliminarTipoM")}
                title="Borrar Máquinas"
                iconName="user-times"
                btnColor="brown"
              />

              {/* Ver Todos */}
              <MyButton
                onPress={() => navigation.navigate("VerTodosTiposMaquina")}
                title="Todos las Máquinas"
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

export default HomeMaquina;