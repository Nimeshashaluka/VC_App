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

export function MessageBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
          <View style={styles.view7}>
            <TextInput style={styles.input1} 
              placeholder="Message..."
              />
            <Pressable style={styles.pressable1}>
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
  view2: {
    height: 70,
    backgroundColor: "#00BFA6",
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  view3: {
    width: "33%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  view7: {
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
