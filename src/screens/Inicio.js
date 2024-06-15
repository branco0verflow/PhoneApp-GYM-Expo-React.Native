import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import MyButton from '../components/MyButton';

const InicioPagina = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#082754', '#031227']} // Rojo oscuro a azul muy oscuro
      style={styles.container}
    >
      <View style={styles.container}>
        <Image source={require('../Images/logo.png')} style={styles.logo} />
        
        <MyButton
          onPress={() => navigation.navigate('HomeScreen')}
          title="Usuarios"
          iconName="person"
          btnColor={['#ff8c00', '#ff0080']}
        />
        
        <MyButton
          onPress={() => navigation.navigate('HomeTipoMaquina')}
          title="Tipo Máquina"
          iconName="construct"
          btnColor={['#ff8c00', '#ff0080']}
        />
        
        <MyButton
          onPress={() => navigation.navigate('HomeTipoMaquina')}
          title="Máquinas"
          iconName="fitness"
          btnColor={['#ff8c00', '#ff0080']}
        />
        
        <MyButton
          onPress={() => navigation.navigate('HomeTipoMaquina')}
          title="Ejercicios"
          iconName="barbell"
          btnColor={['#ff8c00', '#ff0080']}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 270,
    height: 270,
    marginBottom: 50,
    marginTop: -15,
  },
});

export default InicioPagina;
