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

const RegisterUser = ({ navigation }) => {
  // Definir los estados.
  const [userName, setuserName] = useState("");
  const [userApellido, setuserApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // funcion de borrar los estados
  const clearData = () => {
    setuserName("");
    setuserApellido("");
    setCedula("");
    setFechaNacimiento("");
  };

  // Validar datos
  const validateData = () => {
    if (!userName.trim()) {
      Alert.alert("Ingrese su nombre de usuario");
      return false;
    }

    if (!cedula.trim()) {
      Alert.alert("Ingrese su cédula");
      return false;
    }

    if (!fechaNacimiento.trim()) {
      Alert.alert("Ingrese su fecha de nacimiento");
      return false;
    }

    return true;
  };

  const saveUser = async () => {
    const readOnly = false;
    let result = null;
    await db.transactionAsync(async (tx) => {
        result = await databaseConection.createUser(tx, userName, userApellido, cedula, fechaNacimiento);
    }, readOnly);

    return result;
  };

  // funcion que se encargue de guardar los datos.
  const registerUser = async () => {
    if (validateData()) {
      //guardar datos
      const result = await saveUser();
      if (result.rowsAffected > 0) {
        //  validar si se guardar los datos
        Alert.alert(
          "Exito",
          "Usuario Registrado!!",
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
        Alert.alert("Error al registrar usuario");
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
                placeholder="Nombre"
                onChangeText={setuserName}
                style={styles.input}
                value={userName}
              />

              {/* inputs */}
              <MyInputText
                placeholder="Apellido"
                onChangeText={setuserApellido}
                style={styles.input}
                value={userApellido}
              />

              {/* cédula */}
              <MyInputText
                placeholder="Cédula"
                onChangeText={setCedula}
                style={styles.input}
                value={cedula}
              />

              {/* fecha de nacimiento */}
              <MyInputText
                placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
                onChangeText={setFechaNacimiento}
                style={styles.input}
                value={fechaNacimiento}
              />

              {/* button */}
              <MySingleButton onPress={registerUser} title={"Guardar"} />
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

export default RegisterUser;
