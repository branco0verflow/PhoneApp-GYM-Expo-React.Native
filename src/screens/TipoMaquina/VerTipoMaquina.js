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
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const VerTipoMaquina = () => {
  const [NombreTM, setNombreTM] = useState("");
  const [userData, setUserData] = useState(null);

  const GetTipoDB = async () => {
    const readOnly = false;
    let result = null;
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.getOneTipoMaquina(tx, NombreTM);
    }, readOnly);
    return result;
  };

  const getTipoData = async () => {
    //  validar 
    if (!NombreTM.trim()) {
      Alert.alert("El nombre de Tipo de máquina es requerido");
      return;
    }
    // consultar por los datos del TipoMaquina
    const res = await GetTipoDB()
    
    if(res.rows.length > 0) {
      setUserData(res.rows[0])
    }else {
      Alert.alert("Tipo no encontrado")
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
                onChangeText={(text) => setNombreTM(text)}
              />
              <MySingleButton title="Buscar" onPress={getTipoData} />
            </KeyboardAvoidingView>
            <View style={styles.presenterView}>
                <MyText
                  text={`Nombre: ${userData == null ? "" : userData.NombreTM}`}
                  style={styles.presenterText}
                />
                <MyText
                  text={`Url: ${userData == null ? "" : userData.imagenUrlTipoM}`}
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
    margin: 2,
    color: "black",
  },
  presenterView: {
    flex: 2,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    fontSize: 30,
    height: 140,
    borderColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    padding: 20
  },
  presenterText: {
    fontSize: 20,
    color: "black"
  },
});

export default VerTipoMaquina;
