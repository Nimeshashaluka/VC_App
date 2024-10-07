import { useFonts } from "expo-font";
import { useEffect } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome6 } from "@expo/vector-icons";
import { ChatHeaderBar } from "../Components/ChatHeaderBar";
import { MessageBar } from "../Components/MessageBar";
import { useState } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

export default function Chat({ route }) {
  const navigation = useNavigation();
  const profile = require("../assets/Images/download.jpg");

  //other user id
  const { other_user_id } = route.params;
  const { userInfo } = route.params;
  console.log(other_user_id);
  console.log(userInfo);

  //store chat array
  const [getChatArray, setChatArray] = useState([]);

  //send Chat
  const [getChatText, setChatText] = useState("");

  //fetch chat array from server
  useEffect(() => {
    async function fetchChatArray() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);
      console.log(user.id);
      console.log(user);

      let response = await fetch(
        "http://192.168.56.1:8080/Quick_Chat/LoadChat?userId=" +
          user.id +
          "&otherUserId=" +
          userInfo.other_user_id
      );
      if (response.ok) {
        let chatArray = await response.json();
        // console.log(chatArray);
        setChatArray(chatArray);
      }
    }
    fetchChatArray();

    setInterval(() => {
      fetchChatArray();
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.view1}>
      {/* <ChatHeaderBar /> */}
      <View style={styles.view7}>
        <View style={styles.view8}>
          {userInfo.avatar_image_found ? (
            <Image
              source={{
                uri:
                  "http://192.168.56.1:8080/Quick_Chat/AvatarImages/" +
                  userInfo.other_user_mobile +
                  ".png",
              }}
              style={styles.profile}
            />
          ) : (
            <Image source={profile} style={styles.profile} />
          )}
        </View>

        <View style={styles.view9}>
          <Text style={styles.text2}>{userInfo.other_user_name}</Text>
          <Text style={styles.text3}>
            {userInfo.other_user_status == 1 ? "Online" : "Offline"}
          </Text>
        </View>

        <View style={styles.view3}>
          {/* <FontAwesome6 name={"magnifying-glass"} size={26} color={"white"} /> */}
          <FontAwesome6 name={"phone"} size={24} color={"white"} />
          <FontAwesome6 name={"video"} size={24} color={"white"} />
        </View>
      </View>

      <FlashList
        data={getChatArray}
        renderItem={({ item }) => (
          <View style={item.side == "right" ? styles.view4_1 : styles.view4_2}>
            <Text style={styles.text4}>{item.message}</Text>
            <View style={styles.view5}>
              <Text style={styles.text5}>{item.date_time}</Text>

              {item.side == "right" ? (
                <FontAwesome6
                  name={"check"}
                  color={item.status == 1 ? "blue" : "black"}
                  size={20}
                />
              ) : null}
            </View>
          </View>
        )}
        estimatedItemSize={200}
      />

      {/* <MessageBar /> */}

      <View style={styles.view10}>
        <View style={styles.view11}>
          <TextInput
            style={styles.input1}
            placeholder="Message..."
            value={getChatText}
            onChangeText={(text) => {
              setChatText(text);
            }}
          />
          <Pressable
            style={styles.pressable1}
            onPress={async () => {
              // console.log(getChatText);

              if (getChatText.length == 0) {
                Alert.alert("Warning", "Please first type in your Message!");
              } else {
                let userJson = await AsyncStorage.getItem("user");
                let user = JSON.parse(userJson);

                let response = await fetch(
                  "http://192.168.56.1:8080/Quick_Chat/SendChat?logedUserId=" +
                    user.id +
                    "&otherUserId=" +
                    userInfo.other_user_id +
                    "&message=" +
                    getChatText
                );

                if (response.ok) {
                  let json = await response.json();

                  if (json.success) {
                    console.log("Message Sent");
                    setChatText("");
                  }
                }
              }
            }}
          >
            <FontAwesome6 name="paper-plane" size={25} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: "center",
  },
  view2: {
    backgroundColor: "#00BFA6",
    padding: 10,
    flexDirection: "row",
    columnGap: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  image1: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 2,
  },
  text2: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 16,
  },
  text4: {
    fontSize: 16,
  },
  text5: {
    fontSize: 12,
  },

  view4_1: {
    backgroundColor: "#a9dcc1",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-end",
    // rowGap: 1,
    alignSelf: "flex-end",
  },
  view4_2: {
    backgroundColor: "#84c5fc",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 5,
    alignSelf: "flex-start",
  },
  view5: {
    flexDirection: "row",
    columnGap: 10,
  },
  view6: {
    flexDirection: "row",
  },
  image1: {
    width: 70,
    height: 70,
    // backgroundColor:'red',
    borderRadius: 35,
    alignItems: "center",
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
    flexDirection: "row",
    columnGap: 10,
  },
  text2: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 16,
  },

  view9: {
    flex: 1,
    alignItems: "center",
  },
  view8: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
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
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
