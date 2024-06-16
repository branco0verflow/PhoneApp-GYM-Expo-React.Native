import { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
} from "react-native";
import MyText from "../../components/MyText";
import databaseConection from "../../database/database-manager";

const db = databaseConection.getConnection();

const VerTodasMaquinas = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [tipoMaquinas, setTipoMaquinas] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchTipoMaquinas();
    await fetchMaquinas();
  };

  const fetchTipoMaquinas = async () => {
    try {
      const readOnly = true;
      let result = null;
      await db.transactionAsync(async (tx) => {
        result = await databaseConection.getAllTipoMaquina(tx);
        console.log("Tipos de Máquinas:", result); // Añade console.log para depurar
      }, readOnly);

      if (result && result.rows) {
        const fetchedTipoMaquinas = result.rows.map((item) => ({
          id: item.id,
          NombreTM: item.NombreTM,
        }));
        setTipoMaquinas(fetchedTipoMaquinas);
      } else {
        console.log("No se encontraron tipos de máquina.");
      }
    } catch (error) {
      console.error("Error al obtener tipos de máquina: ", error);
    }
  };

  const fetchMaquinas = async () => {
    try {
      const readOnly = false; // y este cambio al main? cual branch - M nuevaRama
      let result = null;
      await db.transactionAsync(async (tx) => {
        result = await databaseConection.getAllMaquina(tx);
        console.log("Máquinas:", result); // Añade console.log para depurar
      }, readOnly);

      if (result && result.rows) {
        const fetchedMaquinas = result.rows.map((item) => ({
          id: item.maquina_id,
          tipo_Mid: item.tipo_Mid,
          nroSala: item.nro_sala, // Asegúrate de que el nombre de la columna sea correcto
        }));
        setMaquinas(fetchedMaquinas);
      } else {
        console.log("No se encontraron máquinas.");
      }
    } catch (error) {
      console.error("Error al obtener máquinas: ", error);
    }
  };

  const listItemView = (item) => {
    const tipoMaquina = tipoMaquinas.find(tm => tm.id === item.tipo_Mid);
    const nombreTM = tipoMaquina ? tipoMaquina.NombreTM : "Tipo Desconocido";

    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText text="Nombre de Máquina:" style={styles.text} />
        <MyText text={nombreTM} style={styles.text_data} />

        <MyText text="Sala:" style={styles.text} />
        <MyText text={String(item.nroSala)} style={styles.text_data} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}> // Falto commit
        <View style={styles.generalView}>
          {maquinas.length ? (
            <FlatList
              data={maquinas}
              contentContainerStyle={styles.flatContainer}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}> No se encuentran Máquinas</Text> 
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  flatContainer: {
    paddingHorizontal: 30,
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
    fontSize: 15,
  },
  text_data: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  empty: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  emptyText: {
    fontSize: 30,
    alignSelf: "center",
    alignContent: "center",
  },
});

export default VerTodasMaquinas;
