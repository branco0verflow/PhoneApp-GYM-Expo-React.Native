import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  View,
  Text,
} from "react-native";
// importar inputs
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const RegisterTipoMaquina = ({ navigation }) => {
  // Definir los estados.
  const [NombreTM, setNombreTM] = useState("");
  const [imagenUrlTipoM, setimagenUrlTipoM] = useState("");

  // funcion de borrar los estados
  const clearData = () => {
    setNombreTM("");
    setimagenUrlTipoM("");
  };

  // Validar datos
  const validateData = () => {
    if (!NombreTM.trim()) {
      Alert.alert("Ingrese un nombre de Tipo");
      return false;
    }

    if (!imagenUrlTipoM.trim()) {
      Alert.alert("Ingrese URL de la imágen");
      return false;
    }

    return true;
  };

  const saveUser = async () => {
    const readOnly = false;
    let result = null;
    await db.transactionAsync(async (tx) => {
        result = await databaseConection.createTipoMaquina(tx, NombreTM, imagenUrlTipoM);
    }, readOnly);

    return result;
  };

  // funcion que se encargue de guardar los datos.
  const registerTipoMaquina = async () => {
    if (validateData()) {
      //guardar datos
      const result = await saveUser();
      if (result.rowsAffected > 0) {
        //  validar si se guardar los datos
        Alert.alert(
          "Exito",
          "Tipo de Maquina Registrada!!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("HomeScreen"),
            },
          ],
          {
            cancelable: false,
          }
        );
        clearData();
      } else {
        Alert.alert("Error al registrar Tipo de Maquina");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboard}>
              {/* inputs */}
              <MyInputText
                placeholder="Nombre de tipo máquina"
                onChangeText={setNombreTM}
                style={styles.input}
                value={NombreTM}
              />

              {/* inputs */}
              <MyInputText
                placeholder="Url de la imágen"
                onChangeText={setimagenUrlTipoM}
                style={styles.input}
                value={imagenUrlTipoM}
              />

              {/* button */}
              <MySingleButton onPress={registerTipoMaquina} title={"Guardar"} />
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
  input: {
    padding: 15,
    textAlignVertical: "top",
  },
});

export default RegisterTipoMaquina;
