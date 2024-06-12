import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
} from "react-native";
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const ViewUser = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);

  const getUserDB = async () => {
    const readOnly = false;
    let result = null;
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.getOneUser(tx, userName);
    }, readOnly);
    return result;
  };

  const getUserData = async () => {
    //  validar username
    if (!userName.trim()) {
      Alert.alert("El nombre de usuario es requerido");
      return;
    }
    // consultar por los datos del usuario
    const res = await getUserDB()
    
    if(res.rows.length > 0) {
      setUserData(res.rows[0])
    }else {
      Alert.alert("Usuario no encontrado")
      setUserData(null)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText text="Filtro de usuario" style={styles.text} />
              <MyInputText
                style={styles.inputStyle}
                placeholder="Nombre de usuario"
                onChangeText={(text) => setUserName(text)}
              />
              <MySingleButton title="Buscar" onPress={getUserData} />
            </KeyboardAvoidingView>
            <View style={styles.presenterView}>
                <MyText
                  text={`Username: ${userData == null ? "" : userData.userName}`}
                  style={styles.presenterText}
                />
                <MyText
                  text={`UserApellido: ${userData == null ? "" : userData.userApellido}`}
                  style={styles.presenterText}
                />
                <MyText
                  text={`Email: ${userData == null ? "" : userData.email}`}
                  style={styles.presenterText}
                />
              </View>
          </ScrollView>
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
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
    fontSize: 20,
  },
  inputStyle: {
    padding: 1,
    margin: 1,
    color: "black",
  },
  presenterView: {
    // flex: 2,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    fontSize: 30,
    height: 100,
    borderColor: "black",
    borderRadius: 50,
    borderWidth: 1,
    padding: 20
  },
  presenterText: {
    fontSize: 20,
    color: "black"
  },
});

export default ViewUser;
