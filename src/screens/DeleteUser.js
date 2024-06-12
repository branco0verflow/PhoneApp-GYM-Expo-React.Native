import { useState } from "react"
import {StyleSheet, View, SafeAreaView, Alert,KeyboardAvoidingView, ScrollView, Text} from "react-native"
import MyInputText from "../components/MyInputText"
import MySingleButton from "../components/MySingleButton"
import MyText from "../components/MyText"

import databaseConection from "../database/database-manager";
const db = databaseConection.getConnection();

const DeleteUser = () => {
    const [userName, setUserName] = useState("")

    const deleteUserDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.deleteUser(tx, userName);
        }, readOnly);
        return result
    }

    const deleteUser = async () => {
        // TODO hacer funcionalidad de borrado
        const res = await deleteUserDB()
        if(res.rowsAffected > 0) {
            Alert.alert("Usuario eliminado")
        }else {
            Alert.alert("El usuario no existe")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Busqueda de usuario" style={styles.text}/>
                        <KeyboardAvoidingView style={{}}>
                            <MyInputText 
                                placeholder="Nombre de usuario"
                                onChangeText={( text ) => setUserName(text)}
                            />
                            <MySingleButton
                                title="Borrar usuario"
                                onPress={deleteUser}
                                style={styles.button}
                            />
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
        flex:1,
        backgroundColor: "white"
    },
    generalView: {
        flex: 1
    },
    input: {
        padding: 15
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
        fontSize: 20
    },
    button: {
        backgroundColor: "red"
    }
})

export default DeleteUser