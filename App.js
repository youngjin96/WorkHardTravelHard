import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { theme } from './color';

export default function App() {
  // work: true, travel: false
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if(text === ""){
      return
    }
    /* ES6
    const newToDos = {
      ...toDos,
      [Date.now()]: {text, work:working}
    };
    */
    // 두개의 object를 state 수정없이 결합하는 방법(Reactjs에서는 안됨)
    const newToDos = Object.assign({}, toDos, {[Date.now()]: {text, work:working}});
    setToDos(newToDos);
    setText("");
  };
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
        {Object.keys(toDos).map((key) => (
        <View style={styles.toDo} key={key}>
          <Text style={styles.toDoText}>{toDos[key].text}</Text>
        </View>
        ))}
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
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  }
});
