import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import * as SecureStore from "expo-secure-store";
import { Button } from 'react-native';


export default function Tab() {
  const [inputValue, setInputValue] = useState("");  // Estado para el valor ingresado
  const [storedValue, setStoredValue] = useState(""); //Estado para el valor almacenado

  //Guardar un dato en SecureStore
  const saveData = async () => {
    try {
      if (!inputValue) {
        Alert.alert("Error", "Ingresa un valor");
        return;
      }
      await SecureStore.setItemAsync("secureData", inputValue); //Se guarda el dato bajo la clave "secureData"
      Alert.alert("Exito", "Dato guardado corretamente");
      setInputValue("");  //Limpia el campo de entrada de dato
      
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el dato.");
    }
  };

  //Recuperacion de un dato en SecureStore
  const retrieveData = async()=> {
    try {
      const value = await SecureStore.getItemAsync("secureData"); //Recupera el dato bajo la clave "secureData"
      if (value) {
        setStoredValue(value);  //Actualiza el estado con el valor recuperado
      }
      else{
        Alert.alert("Info", "No tienes ningun dato almacenado.");
      }
      
    } catch (error) {
      Alert.alert("Error", "No se pudo recuperar el dato.");
    }
  };

  //Eliminar un dato de SecureStore
  const deleteData = async() => {
    try {
      await SecureStore.deleteItemAsync("secureData");  //Elimina el dato clave "SecureData"
      setStoredValue(""); //Limpia el estado del valor almacenado
      Alert.alert("Exito", "Dato Eliminado correctamente");
      
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el dato.");
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style ={styles.label}> Hola!!! , Porfavor ingresa un dato para guardar:</Text>
      <TextInput
      value={inputValue}
      onChangeText={setInputValue}
      placeholder="Escribe aqui tu dato"
      style={styles.input}
      />
      <View style = {styles.buttonContainer}>
        <Button title="Guadar dato" onPress={saveData} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Recuperar Dato" onPress={retrieveData} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Eliminar Dato" onPress={deleteData} />
      </View>
      {storedValue ? (
        <Text style = {styles.storedText}>Dato almacenado:{storedValue}</Text>

      ): null}
    </View>
    
    
  );
}


//ESTILOS

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label :{
    fontSize: 16,
    marginBottom: 10,
  },
  input:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    width: "80%",
    marginBottom: 20,
  },
  buttonContainer : {
    marginVertical: 5,
    width: "80%",
  },
  storedText : {
    marginTop: 20,
    fontSize: 16,
    color: "green",
  },
});
