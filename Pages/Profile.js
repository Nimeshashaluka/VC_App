import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FooterNavBar } from "../Components/FooterNavBar";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function Profile() {
  const navigation = useNavigation();
  const [getUser, setUser] = useState([]);
  const profile = require("../assets/Images/download.jpg");

  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getEmail, setEmail] = useState("");

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
    <SafeAreaView>
      <View style={styles.view1}>
        <Text style={styles.text1}>My Profile</Text>
        <View style={styles.view3}>
          {getUser.mobile ? (
            <Image
              source={{
                uri:
                  "http://192.168.56.1:8080/Quick_Chat/AvatarImages/" +
                  getUser.mobile +
                  ".png",
              }}
              contentFit="contain"
              style={styles.view3}
            />
          ) : (
            <Image source={profile} style={styles.view3} />
          )}
        </View>

        <View style={styles.view2}>
          <Text style={styles.textInput1}>First Name</Text>
          <TextInput
            style={styles.input1}
            inputMode={"text"}
            maxLength={20}
            value={getUser.first_name}
            placeholder="Your First Name"
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />

          <Text style={styles.textInput1}>Last Name</Text>
          <TextInput
            style={styles.input1}
            inputMode={"text"}
            maxLength={20}
            value={getUser.last_name}
            placeholder="Your Last Name"
            onChangeText={(text) => {
              setLastName(text);
            }}
          />

          <Text style={styles.textInput1}>Mobile</Text>
          <TextInput
            style={styles.input1}
            inputMode={"tel"}
            maxLength={10}
            value={getUser.mobile}
            placeholder="Your Mobile"
            onChangeText={(text) => {
              setMobile(text);
            }}
          />

          <Text style={styles.textInput1}>Email</Text>
          <TextInput
            style={styles.input1}
            inputMode={"email"}
            maxLength={45}
            value={getUser.email}
            placeholder="Your Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          {/* <Pressable
            style={styles.StBtn1}
            onPress={() => navigation.navigate("LogIn")}
          >
            <Text style={styles.btnText1}>Update</Text>
          </Pressable> */}

          <Pressable
            style={styles.StBtn2}
            onPress={() => {
              userJson = null;
              navigation.navigate("LogIn");
            }}
          >
            <Text style={styles.btnText2}>Log Out</Text>
          </Pressable>
        </View>
      </View>
      <FooterNavBar />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  view1: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 5,
  },

  text1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  view2: {
    width: "100%",
    padding: 20,
  },
  view3: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#00BFA6",
  },
  textInput1: {
    padding: 5,
    fontSize: 16,
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
    borderColor: "#00BFA6",
    borderWidth: 2,
  },
  btnText1: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  StBtn1: {
    width: "100%",
    height: 45,
    backgroundColor: "#536DFE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 8,
  },
  btnText2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  StBtn2: {
    width: "100%",
    height: 45,
    backgroundColor: "#F50057",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 25,
    marginBottom:35,
  },
});
