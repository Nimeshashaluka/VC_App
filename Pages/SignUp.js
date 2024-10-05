import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const navigation = useNavigation();
  const [getImage, setImage] = useState(null);

  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.SafeAreaView1}>
      <ScrollView>
        <View style={styles.view1}>
          <Text style={styles.text1}>User Registration</Text>

          <Pressable
            style={styles.mainImage}
            onPress={async () => {
              //   Alert.alert("Message", "Ok");
              let result = await ImagePicker.launchImageLibraryAsync({});
              if (!result.canceled) {
                setImage(result.assets[0].uri);
              }
            }}
          >
            <Image
              source={getImage}
              style={styles.mainImage}
              contentFit={"contain"}
            />
          </Pressable>

          <Text style={styles.profileText}>Profile Image</Text>

          <View style={styles.view2}>
            <Text style={styles.textInput1}>First Name</Text>
            <TextInput
              style={styles.input1}
              inputMode={"text"}
              maxLength={20}
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
              placeholder="Your Email"
              onChangeText={(text) => {
                setEmail(text);
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
          </View>

          <Pressable
            style={styles.StBtn1}
            onPress={async () => {
              let formData = new FormData();
              formData.append("firstName", getFirstName);
              formData.append("lastName", getLastName);
              formData.append("mobile", getMobile);
              formData.append("email", getEmail);
              formData.append("password", getPassword);
             
              if (getImage != null) {
                formData.append("avatarImage",

                  {
                    name: "avatar.png",
                    type: "image/png",
                    uri: getImage,
                  }
                );
              }

              let response = await fetch(
                "http://192.168.56.1:8080/Quick_Chat/SignUp",
                {
                  method: "POST",
                  body: formData,
                }
              );

              if (response.ok) {
                let json = await response.json();
                // Alert.alert("Response", json.message);

                if (json.success) {
                  //sign up success
                  Alert.alert("Success", json.message);
                  navigation.navigate("LogIn")

                } else {
                  //sign up problem
                  Alert.alert("Error", json.message);
                }
              }
            }}
          >
            <Text style={styles.btnText}>Register</Text>
          </Pressable>

          <Pressable
            style={styles.StBtn2}
            onPress={() => navigation.navigate("LogIn")}
          >
            <Text style={styles.btnText2}>Log In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView1: {
    flex: 1,
    marginTop: 15,
  },
  view1: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 10,
    padding: 15,
  },
  text1: {
    fontSize: 26,
    fontWeight: "bold",
    // marginBottom:10
  },
  view2: {
    width: "100%",
    // marginBottom:10,
    // backgroundColor: "red",
  },
  mainImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#00BFA6",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 16,
    fontWeight: "bold",
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
    marginTop: 20,
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
