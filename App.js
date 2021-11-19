import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './color';
import { Fontisto } from '@expo/vector-icons'; 

const STORAGE_KEY = "@toDos"

export default function App() {
  // work: true, travel: false
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  // localStorage와 같은 기능
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  }
  useEffect(() => {
    loadToDos();
  }, []);
  // AsyncStorage에 add 기능
  const addToDo = async () => {
    if(text === ""){
      return
    }
    /* 두개의 object를 state 수정없이 결합하는 방법(Reactjs에서는 안됨)
    const newToDos = Object.assign({}, toDos, {[Date.now()]: {text, working}});
    */
    // ES6
    const newToDos = {
      ...toDos,
      [Date.now()]: {text, working}
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  // AsyncStorage에 delete 기능
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do?", "Are you sure?",[
      {text: "Cancel"}, 
      {text: "Sure", style: "destructive",
        onPress: () => {
          const newToDos = {...toDos};
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };
  // AsyncStorage에 modify 기능
  const modifyToDo = (key) => {
    Alert.prompt("Modify To Do?", "", [
      {text: "Cancel"},
      {text: "Modify",
        onPress: value => {
          const newToDos = {...toDos};
          newToDos[key].text = value;
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* 터치 이벤트가 발생할때 listen할 수 있다. Opacity가 있는 이유는 누를때 투명해지는 효과를 얻기 위함
            pressable이 새로 나왔다. */}
        <TouchableOpacity onPress={work}>
          {/* style을 object로 사용하면서 확장하는 법 {{... }} */}
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        placeholder={working ? "Add To Do" : "Where To Go"}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) => 
          toDos[key].working === working ? (            
          <View style={styles.toDo} key={key}>
            <TouchableOpacity>
              <Text style={styles.toDoText} onPress={() => modifyToDo(key)}>{toDos[key].text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteToDo(key)}>
              <Fontisto name="trash" size={20} color="white" />
            </TouchableOpacity>      
          </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal : 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
    
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input:{
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo:{
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",    
  },
});
