import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";  //construir interfaz el usuario
import AsyncStorage from "@react-native-async-storage/async-storage"; //API para almacenar datos persistentes

const StorageExample = () => {
  const [tempData, setTempData] = useState(""); //almacena dato ingresado antes de guardarlo en AsyncS
  const [data, setData] = useState(""); //guarda valor actual del TextInput
  const [storedData, setstoredData] = useState(""); //almacena dato recuperado de AsyncS

  // Guardar datos en AsyncStorage
  const saveData = async () => {
    try {
      await AsyncStorage.setItem("userData", data);
      setTempData(data);
      Alert.alert("Guardado", "Dato guardado.");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el dato.");
    }
  };

  // Cargar datos desde AsyncStorage
  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("userData"); //Recupera el valor almacenado
      if (value !== null) {
        setstoredData(value); // Actualiza el estado storedData con el valor recuperado
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el nombre.");
    }
  };

  // Eliminar datos de AsyncStorage
  const clearData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setstoredData("");
      Alert.alert("Eliminado", "Elemento eliminado.");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el dato.");
    }
  };

  // Cargar el nombre almacenado al iniciar la app
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Ingresa un dato:</Text>
      <TextInput
        value={data}
        onChangeText={setData}
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />
      <Button title="Guardar Dato" style={{ marginVertical: 5 }} onPress={saveData} />
      <Button title="Cargar Dato" onPress={loadData} />
      <Button title="Eliminar Dato" onPress={clearData} />
      {storedData ? <Text>Dato guardado: {storedData}</Text> : null}
      <Text>Dato Temporal: {tempData}</Text>
    </View>
  );
};

export default StorageExample;

//Cargar Dato: recupera el dato almacenado y se muestra en la interfaz.
//