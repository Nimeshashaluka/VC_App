import { FontAwesome6 } from "@expo/vector-icons";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useState } from "react";

export function HeaderBar() {
  const profile = require("../assets/Images/download.jpg");
  const [getUser, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);
      setUser(user);
      console.log(user.id);
      console.log(user);
    }
    fetchUser();
  }, []);

  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          {/* <FontAwesome6 name={"magnifying-glass"} size={26} color={"white"} /> */}
          <FontAwesome6
            name={"bars"}
            size={32}
            color={"white"}
            onPress={() => {
              Alert.alert("Warning", "Navigation bar");
            }}
          />
        </View>
        <View style={styles.view4}>
          <TextInput
            style={styles.input1}
            inputMode={"text"}
            placeholder="Search..."
          />
        </View>
        <View style={styles.view5}>
          {getUser.mobile ? 
            <Image
              source={{
                uri:
                  "http://192.168.56.1:8080/Quick_Chat/AvatarImages/" +
                  getUser.mobile +
                  ".png",
              }}
              contentFit="contain"
              style={styles.profile}
            />
          : (
            <Image source={profile} style={styles.profile} />
          )}
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
    width: 100,
    paddingStart: 20,
    // backgroundColor: "yellow",
  },
  view4: {
    flex: 1,
    // backgroundColor: "green",
    alignItems: "center",
  },
  view5: {
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
