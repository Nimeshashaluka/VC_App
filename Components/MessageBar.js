import { FontAwesome6 } from "@expo/vector-icons";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


export function MessageBar() {
  const navigation = useNavigation();
  const [getChatText,setChatText] = useState("");

  return (
    <View style={styles.view1}>
      <View style={styles.view10}>
          <View style={styles.view11}>
            <TextInput style={styles.input1} 
              placeholder="Message..."
              onChangeText={
                (text)=>{
                    setChatText(text)
                }
              }
              />
            <Pressable style={styles.pressable1} onPress={
                async()=>{
                    // console.log(getChatText);
                    let response = await fetch("http://192.168.56.1:8080/Quick_Chat/SendChat?logedUserId=2&otherUserId="+userInfo.other_user_id+"&message="+getChatText);

                    if(response.ok){
                        let json = await response.json();

                        if(json.success){
                            console.log("Message Sent");
                        }
                    }
                }
            }>
              <FontAwesome6 name="paper-plane" size={25} />
            </Pressable>
          </View>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view1: {
    // flex: 1,
  },
  view10: {
    height: 70,
    backgroundColor: "#00BFA6",
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
 
  view11: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 15,
    paddingHorizontal: 20,
  },

  input1: {
    height: 40,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
    paddingStart: 10,
  },

  pressable1: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth:2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
