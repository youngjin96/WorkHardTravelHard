import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.btnText}>Work</Text>
        <Text style={styles.btnText}>Travel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#000",
    paddingHorizontal : 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color = "white",
  },
});
