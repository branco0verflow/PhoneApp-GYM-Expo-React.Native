import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InicioPagina = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../Images/logo.png')} style={styles.logo} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.buttonText}>Administrar usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeTipoMaquina')}
      >
        <Text style={styles.buttonText}>Administrar Tipo Máquina</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#154360', // Azul oscuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1C40F',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#F0F3F4 ', // Azul oscuro
    fontWeight: 'bold',
  },
});

export default InicioPagina
