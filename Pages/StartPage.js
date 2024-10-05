import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const imagePath = require("../assets/Images/startImage.png");

  const navigation = useNavigation();

  return (
    <View style={styles.view1}>
      <Text style={styles.text1}>Quick Chat</Text>
      <Text>Hi, Welcome To Quick Chat App</Text>
      <Image source={imagePath} style={styles.image} />

      <View style={styles.view3}>
        <View style={styles.nextBtn}></View>
        <View style={styles.nextBtn2}></View>
      </View>

      <Pressable
        style={styles.StBtn1}
        onPress={() => navigation.navigate("LogIn")}
      >
        <Text style={styles.btnText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  text1: {
    fontSize: 38,
  },
  image: {
    width: "100%",
    height: "70%",
  },
  view3: {
    width: "100%",
    height: 50,
    // backgroundColor: "red",
    marginBottom: 15,
    flexDirection: "row",
    columnGap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  nextBtn: {
    width: 12,
    height: 12,
    backgroundColor: "#00BFA6",
    borderRadius: 50,
  },
  nextBtn2: {
    width: 12,
    height: 12,
    backgroundColor: "#BDEFE8",
    borderRadius: 50,
  },

  btnText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  StBtn1: {
    width: "100%",
    height: 45,
    backgroundColor: "#00BFA6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
