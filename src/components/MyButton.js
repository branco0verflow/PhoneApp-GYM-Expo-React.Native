import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const MyButton = ({ onPress, title, iconName, btnColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <LinearGradient
        colors={['#ff8c00', '#ff0080']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '80%',
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyButton
