import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native"
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const ModificarTipoMaquina = ({ navigation }) => {
    // estado para busqueda 
    const [NombreTMSearch, setNombreTMSearch] = useState("")
    // estado para el usuario a hacer update
    const [NombreTM, setNombreTM] = useState("")
    const [imagenUrlTipoM, setimagenUrlTipoM] = useState("")

    const updateTipoMaquinaDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateTipoMaquina(tx, NombreTM, imagenUrlTipoM);
        }, readOnly);
        return result
    }

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneTipoMaquina(tx, NombreTMSearch);
        }, readOnly);
        return result
    }

    // TODO funcion que busque al usuario
    const searchUser = async () => {
        if (!NombreTMSearch.trim()) {
            Alert.alert("El nombre de usuario no puede estar vacio")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if (res && res.rows && res.rows.length > 0) {
            setNombreTM(res.rows[0].NombreTM)
            setimagenUrlTipoM(res.rows[0].imagenUrlTipoM)
        } else {
            setimagenUrlTipoM("")
            setNombreTM("")
        }
    }

    // TODO funcion de hacer el update del usuario
    const updateTipoMaquina = async () => {
        if (!NombreTM.trim()) {
            Alert.alert("El nombre del tipo no puede estar vacío")
            return
        }

        if (!imagenUrlTipoM.trim()) {
            Alert.alert("La URL no puede estar vacía")
            return
        }

        // update
        const res = await updateTipoMaquinaDB()
        console.log("res", res)
        if (res.rowsAffected > 0) {
            Alert.alert(
                "Exito",
                "Usuario Actualizado!!",
                [
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("HomeTipoMaquina"),
                  },
                ],
                {
                  cancelable: false,
                }
              );
        } else {
            Alert.alert("No se pudo actualizar el Tipo de Máquina")
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar Usuario" style={styles.text} />
                            <MyInputText
                                placeholder="Ingrese el nombre de Usuario"
                                style={{}}
                                onChangeText={(text) => setNombreTMSearch(text)}
                            />
                            <MySingleButton title="Buscar" onPress={searchUser} />

                            <View style={styles.form}>
                                <MyInputText
                                    placeholder="Ingrese el nombre de usuario"
                                    defaultValue={NombreTM}
                                    onChangeText={(text) => setNombreTM(text)}
                                />
                                <MyInputText
                                    placeholder="Ingrese el apellido de usuario"
                                    defaultValue={imagenUrlTipoM}
                                    onChangeText={(text) => setimagenUrlTipoM(text)}
                                />

                                <MySingleButton
                                    title="Actualizar"
                                    onPress={updateTipoMaquina}
                                    style={styles.button}
                                />
                            </View>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    generalView: {
        flex: 1
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
        fontSize: 20
    },
    input: {
        padding: 15
    },
    keyBoardView: {
        flex: 1,
        justifyContent: "space-between"
    },
    form: {
        flex: 1,
        marginTop: 25
    },
    button: {
        backgroundColor: 'orange',
    }
})

export default ModificarTipoMaquina