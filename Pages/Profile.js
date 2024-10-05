import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView>
      <View style={styles.view1}>
        <Text style={styles.text1}>My Profile</Text>
        <View style={styles.view3}></View>

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
        </View>
        <Pressable
          style={styles.StBtn1}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text style={styles.btnText1}>Update</Text>
        </Pressable>

        <Pressable
          style={styles.StBtn2}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text style={styles.btnText2}>Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  view1: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 10,
    padding: 20,
  },

  text1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  view2: {
    width: "100%",
  },
  view3: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
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
    marginTop: 8,
  },
});
