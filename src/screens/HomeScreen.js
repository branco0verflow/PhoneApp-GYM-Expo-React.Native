import { useEffect } from "react"
import {SafeAreaView, View, StyleSheet, ScrollView} from "react-native"
import MyButton from "../components/MyButton"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        const init = async () => {
            const readOnly = false;
            await db.transactionAsync(async tx => {
                console.log("transaction", tx)
                const tableExist = await databaseConection.checkTableExist(tx)
                console.log("table exists", tableExist.rows)
                if(tableExist.rows.length) {
                    // await databaseConection.dropTable(tx)
                }
                const result = await databaseConection.createUserTable(tx)
                console.log("### results ####", result)
            }, readOnly);
        }

        init().then(() => console.log("exec"))
    }, [])

    const clearDB = async () => {
        const readOnly = false;
        await db.transactionAsync(async tx => {
            databaseConection.deleteAllUser(tx)
        }, readOnly)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={styles.scollview}>
                            {/* button add user*/}
                            <MyButton 
                                onPress={() => navigation.navigate("RegisterUser")} 
                                title="Registro de Usuario" 
                                iconName="user-plus" 
                                btnColor="green"
                            />
                            
                            {/* button update user */}
                            <MyButton 
                                onPress={() => navigation.navigate("UpdateUser")} 
                                title="Actualizar Usuario" 
                                iconName="user-circle" 
                                btnColor="blue"
                            />

                              {/* button delete user*/}
                              <MyButton 
                                onPress={() => navigation.navigate("DeleteUser")} 
                                title="Borrar Usuario" 
                                iconName="user-times" 
                                btnColor="brown"
                            />

                            {/* button user */}
                            <MyButton 
                                onPress={() => navigation.navigate("ViewUser")} 
                                title="Ver Usuario" 
                                iconName="user-times" 
                                btnColor="purple"
                            />

                            {/* button list user*/}
                            <MyButton 
                                onPress={() => navigation.navigate("ViewAllUsers")} 
                                title="Ver todos los Usuario" 
                                iconName="user-times" 
                                btnColor="orange"
                            />

                            {/* borrar db */}
                            <MyButton 
                                onPress={clearDB} 
                                title="Borrar DB" 
                                iconName="remove" 
                                btnColor="red"
                            />

                            {/* Importar db */}
                            <MyButton 
                                onPress={() => OpenDatabase("database.db")} 
                                title="Importar DB" 
                                iconName="add" 
                                btnColor="gray"
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"

    },
    viewContainer: {
        flex: 1,
        backgroundColor: "black",
        alignContent: "center"
    },
    generalView: {
        flex: 1,
        justifyContent: "center"
    },
    internalView: {
        flex: 1,
        justifyContent: "center"
    },
    scollview: {
        flex:1,
        flexDirection: "column",
        padding:20,
        margin: 10
    }
})

export default HomeScreen;