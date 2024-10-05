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

export function FooterNavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <View style={styles.view3}>

            <Pressable
            onPress={() => {
              // Alert.alert("ok","Home");
              navigation.navigate("Home");
            }}
          >
            <FontAwesome6 name={"house"} size={28} color={"white"} />
          </Pressable>

        </View>

        <View style={styles.view4}>
          <Pressable
            onPress={() => {
              Alert.alert("ok","Contact");
              navigation.navigate("Contact");
            }}
          >
            <FontAwesome6 name={"address-book"} size={32} color={"white"} />
          </Pressable>
        </View>

        <View style={styles.view5}>
          <Pressable
            onPress={() => {
              // Alert.alert("ok","Done");
              navigation.navigate("Profile");
            }}
          >
            <FontAwesome6 name={"user"} size={28} color={"white"} />
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
  view4: {
    width: "33%",
    height: 70,
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  view5: {
    width: "33%",
    // flex: 1,
    height: 70,
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    // backgroundColor: "white",
    borderWidth: 2,
    borderColor: "white",
  },
  input1: {
    width: "100%",
    height: 50,
    borderStyle: "solid",
    borderWidth: 2,
    fontSize: 18,
    fontWeight: "bold",
    paddingStart: 15,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 5,
    color: "white",
  },
});
