import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function App() {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const logInImageP = require("../assets/Images/loginimage.png");

  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  useEffect(() => {
    async function checkUser() {
      console.log("2");
      try {
        let userJson = await AsyncStorage.getItem("user");
        if (userJson != null) {
          navigation.navigate("Home");
        }
      } catch (e) {
        console.log(e);
      }
    }
    checkUser();
  }, []);

  return (
    <SafeAreaView style={styles.SafeAreaView1}>
      <ScrollView>
        <View style={styles.view1}>
          <Text style={styles.text1}>User Log In</Text>

          <Image source={logInImageP} style={styles.logImage} />

          <View style={styles.view2}>
            <Text style={styles.textInput1}>Mobile</Text>
            <TextInput
              style={styles.input1}
              inputMode={"tel"}
              maxLength={10}
              placeholder="Your Mobile"
              onChangeText={(text) => {
                setMobile(text);
              }}
            />

            <Text style={styles.textInput1}>Password</Text>
            <TextInput
              style={styles.input1}
              secureTextEntry={true}
              maxLength={25}
              placeholder="Your Password"
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <View style={styles.frogotText}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#4630EB" : undefined}
              />
              <Text style={styles.remeb}>Remember Me</Text>
              <Text style={styles.froget1}>Forgot Password</Text>
            </View>
          </View>

          <Pressable
            style={styles.StBtn1}
            onPress={async () =>
              // navigation.navigate("Index")
              {
                let response = await fetch(
                  "http://192.168.56.1:8080/Quick_Chat/SignIn",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      mobile: getMobile,
                      password: getPassword,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (response.ok) {
                  let json = await response.json();

                  if (json.success) {
                    let user = json.user;
                    Alert.alert(
                      "Success",
                      "Hello " +
                        user.first_name +
                        "! , Your Account " +
                        json.message
                    );

                    try{
                      await AsyncStorage.setItem("user",JSON.stringify(user));

                    }catch(e){

                    }

                    navigation.navigate("Home")
                  } else {
                    Alert.alert("Error", json.message);
                  }
                }
              }
            }
          >
            <Text style={styles.btnText}>Log In</Text>
          </Pressable>

          <Pressable
            style={styles.StBtn2}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.btnText2}>Create New Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView1: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "white",
  },
  view1: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 10,
    padding: 20,
  },
  text1: {
    fontSize: 28,
    fontWeight: "bold",
  },
  logImage: {
    width: "100%",
    height: 310,
  },
  view2: {
    width: "100%",
    marginBottom: 20,
    // backgroundColor: "red",
  },
  frogotText: {
    flexDirection: "row",
    columnGap: 10,
    padding: 5,
    paddingEnd: 10,
    justifyContent: "space-between",
  },
  textInput1: {
    padding: 5,
    fontSize: 16,
  },
  remeb: {
    fontSize: 14,
    // color: "blue",
    marginRight: "30%",
  },
  froget1: {
    fontSize: 14,
    color: "#00B0FF",
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
    marginBottom: 5,
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
  },
});
