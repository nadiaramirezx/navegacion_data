import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";

// Crear la base de datos
const db = SQLite.openDatabaseAsync("basededatosA4.db");

export default function Tab() {
  const [name, setName] = useState(""); // Estado para el nombre ingresado
  const [users, setUsers] = useState([]); // Estado para la lista de usuarios

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);",
        [],
        () => console.log("Tabla creada o ya existente"),
        (_, error) => console.log("Error al crear la tabla:", error)
      );
    });
    loadUsers(); // Cargar usuarios al iniciar la app
  }, []);

  // Insertar un usuario en la tabla
  const addUser = () => {
    if (!name) {
      alert("Por favor, ingresa un nombre.");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (name) VALUES (?);",
        [name],
        (_, result) => {
          console.log("Usuario insertado:", result.insertId);
          setName(""); // Limpia el campo de entrada
          loadUsers(); // Recarga la lista de usuarios
        },
        (_, error) => console.log("Error al insertar usuario:", error)
      );
    });
  };

  // Cargar usuarios desde la BD
  const loadUsers = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users;",
        [],
        (_, { rows }) => setUsers(rows._array),
        (_, error) => console.log("Error al cargar usuarios:", error)
      );
    });
  };

  // Eliminar un usuario por su ID
  const deleteUser = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM users WHERE id = ?;",
        [id],
        (_, result) => {
          console.log("Usuario eliminado:", id);
          loadUsers(); // Recarga la lista de usuarios
        },
        (_, error) => console.log("Error al eliminar usuario:", error)
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQLite en Expo</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ingresa un nombre"
        style={styles.input}
      />
      <Button title="Agregar Usuario" onPress={addUser} />

      <Text style={styles.subtitle}>Usuarios:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
            <Button title="Eliminar" onPress={() => deleteUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontSize: 16,
  },
});