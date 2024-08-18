import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Background2 from './Background2';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../config';
// Componente principal para la pantalla de recuperación de contraseña
const RecuperarContrasena = () => {
  const [correo, setCorreo] = useState(''); // Estado para almacenar el correo electrónico del usuario
  const navigation = useNavigation(); // Hook para la navegación

  // Función para volver a la pantalla anterior
  const handleBack = () => {
    navigation.goBack();
  };

  // Función para validar el formato del correo electrónico
  const validarCorreo = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Manejo del botón para la recuperación de contraseña
  const handleRecuperarContrasena = async () => {
    if (validarCorreo(correo)) {
      try {
        const response = await fetch(`${BASE_URL}/password_reset_request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo_electronico: correo }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          Alert.alert('Correo enviado', data.message);
          navigation.goBack();
        } else {
          Alert.alert('Error', data.error || 'Ha ocurrido un error al enviar el correo electrónico.');
        }
      } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        Alert.alert('Error', 'Ha ocurrido un error al enviar el correo electrónico.');
      }
    } else {
      Alert.alert('Error', 'Por favor, introduce un correo electrónico válido.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Background2 />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.appTitle}>APP ONTA</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>Recuperar Contraseña</Text>
        <Text style={styles.instructions}>
          Escribe tu email, a continuación, y te enviaremos un correo electrónico para restablecer la contraseña.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Introduce tu Correo Electrónico"
            placeholderTextColor="#ffffff"
            onChangeText={setCorreo}
            value={correo}
          />
        </View>
        <TouchableOpacity style={styles.buttonLong} onPress={handleRecuperarContrasena}>
          <Text style={styles.buttonText}>RECUPERAR CONTRASEÑA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 20,
  },
  backButton: {
    marginRight: 10,
    marginTop: 30,
  },
  appTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginTop: 30,
    marginLeft: 30,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  instructions: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 70,
  },
  formContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    backgroundColor: '#0094F1',
    padding: 30,
    borderRadius: 10,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#0094F1',
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    padding: 0,
    fontSize: 15,
    maxHeight: 100,
  },
  inputLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonLong: {
    backgroundColor: '#00C29D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RecuperarContrasena;
