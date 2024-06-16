import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  View,
  Text
} from "react-native";
import MySingleButton from "../../components/MySingleButton";
import RNPickerSelect from "react-native-picker-select";
import databaseConection from "../../database/database-manager";

const db = databaseConection.getConnection();

const RegisterMaquina = ({ navigation }) => {
  // Definir los estados.
  const [tipoTM, setTipoTM] = useState("");
  const [nroSala, setNroSala] = useState("");
  const [tipoMaquinas, setTipoMaquinas] = useState([]);

  useEffect(() => {
    fetchTipoMaquinas();
  }, []);

  // Función para obtener los tipos de máquina de la base de datos
  const fetchTipoMaquinas = async () => {
    try {
      const readOnly = true;
      let result = null;
      await db.transactionAsync(async (tx) => {
        result = await databaseConection.getAllTipoMaquina(tx);
        console.log("ESTE ES EL GET ALL", result);
      }, readOnly);

      if (result && result.rows) {
        const fetchedTipoMaquinas = result.rows.map((item) => ({
          label: item.NombreTM,
          value: item.id, // asumiendo que quieres usar 'id' como value
        }));
        setTipoMaquinas(fetchedTipoMaquinas);
      } else {
        console.log("No se encontraron tipos de máquina.");
      }
    } catch (error) {
      console.error("Error al obtener tipos de máquina: ", error);
    }
  };

  // Función de borrar los estados
  const clearData = () => {
    setTipoTM("");
    setNroSala("");
  };

  // Validar datos
  const validateData = () => {
    if (!tipoTM) {
      Alert.alert("Seleccione el tipo de máquina");
      return false;
    }

    if (!nroSala) {
      Alert.alert("Seleccione el número de sala");
      return false;
    }

    return true;
  };

  const saveMaquina = async () => {
    const readOnly = false;
    let result = null;

    await db.transactionAsync(async (tx) => {
      result = await databaseConection.createMaquina(tx, tipoTM, nroSala);
    }, readOnly);

    return result;
  };

  // Función que se encargue de guardar los datos.
  const registerMaquina = async () => {
    if (validateData()) {
      // Guardar datos
      const result = await saveMaquina();
      if (result.rowsAffected > 0) {
        // Validar si se guardan los datos
        Alert.alert(
          "Éxito",
          "Máquina Registrada!!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("HomeMaquina"),
            },
          ],
          {
            cancelable: false,
          }
        );
        clearData();
      } else {
        Alert.alert("Error al registrar la Máquina");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboard}>
              {/* Dropdown para Tipo de Máquina */}
              <Text style={styles.label}>Tipo de Máquina:</Text>
              <RNPickerSelect
                onValueChange={(value) => setTipoTM(value)}
                items={tipoMaquinas}
                placeholder={{
                  label: "Seleccione el tipo de máquina",
                  value: null,
                }}
                style={pickerSelectStyles}
                value={tipoTM}
              />

              {/* Dropdown para Número de Sala */}
              <Text style={styles.label}>Número de Sala:</Text>
              <RNPickerSelect
                onValueChange={(value) => setNroSala(value)}
                items={[
                  { label: "1", value: 1 },
                  { label: "2", value: 2 },
                  { label: "3", value: 3 },
                  { label: "4", value: 4 },
                  { label: "5", value: 5 },
                  { label: "6", value: 6 },
                  { label: "7", value: 7 },
                  { label: "8", value: 8 },
                  { label: "9", value: 9 },
                  { label: "10", value: 10 },
                ]}
                placeholder={{
                  label: "Seleccione el número de sala",
                  value: null,
                }}
                style={pickerSelectStyles}
                value={nroSala}
              />

              {/* Botón */}
              <MySingleButton onPress={registerMaquina} title={"Guardar"} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default RegisterMaquina;
