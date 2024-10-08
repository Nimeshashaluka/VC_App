import { FontAwesome6 } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export function ChatHeaderBar() {
  const profile = require("../assets/Images/download.jpg");

  return (
    <View style={styles.view1}>
      <View style={styles.view7}>

        <View style={styles.view8}>
          {/* <View style={styles.profile}> */}
          <Image source={profile} style={styles.profile} />
          {/* </View> */}
        </View>

        <View style={styles.view9}>
          <Text style={styles.text2}>Sahan Perera</Text>
          <Text style={styles.text3}>Online</Text>
        </View>

        <View style={styles.view3}>
          {/* <FontAwesome6 name={"magnifying-glass"} size={26} color={"white"} /> */}
          <FontAwesome6 name={"phone"} size={24} color={"white"} />
          <FontAwesome6 name={"video"} size={24} color={"white"} />
        </View>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view1: {
    // flex: 1,
  },
  view7: {
    height: 70,
    backgroundColor: "#00BFA6",
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  view3: {
    width: 100,
    paddingStart: 20,
    flexDirection:"row",
    columnGap:10,

  }, text2: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 16,
  },

  view9: {
    flex: 1,
    // backgroundColor: "green",
    alignItems: "center",
  },
  view8: {
    width: 80,
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
