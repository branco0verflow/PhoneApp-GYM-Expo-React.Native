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
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const RegisterUser = ({ navigation }) => {
  // Definir los estados.
  const [userName, setuserName] = useState("");
  const [userApellido, setuserApellido] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // funcion de borrar los estados
  const clearData = () => {
    setEmail("");
    setPassword("");
    setuserName("");
    setuserApellido("");
  };

  // Validar datos
  const validateData = () => {
    if (!userName.trim()) {
      Alert.alert("Ingrese su nombre de usuario");
      return false;
    }

    if (!password.trim()) {
      Alert.alert("Ingrese su contraseña");
      return false;
    }

    if (!email.trim() && email.indexOf("@") == -1) {
      Alert.alert("Ingrese su email");
      return false;
    }

    return true;
  };

  const saveUser = async () => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
        result = await databaseConection.createUser(tx, userName, userApellido, email, password);
    }, readOnly);

    return result
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
          "Usuario Registrados!!",
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
      } else {
        Alert.alert("Error al registrar usuario")
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

              {/* contraseña */}
              <MyInputText
                placeholder="Contraseña"
                onChangeText={setPassword}
                maxLength={16}
                secureTextEntry={true}
                style={styles.input}
                value={password}
              />

              {/* correo */}
              <MyInputText
                placeholder="Correo Electronico"
                keyboardType="email-address"
                onChangeText={setEmail}
                style={styles.input}
                value={email}
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
