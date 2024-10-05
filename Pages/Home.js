import { useFonts } from "expo-font";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome6 } from "@expo/vector-icons";
import {HeaderBar}from "../Components/HeaderBar";
import { FooterNavBar } from "../Components/FooterNavBar";
import { useState } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";


export default function Home() {
  const [getChatArray, setChatArray] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);

      let response = await fetch(
        "http://192.168.56.1:8080/Quick_Chat/LoadHomeData?id=" + user.id
      );

      if (response.ok) {
        let json = await response.json();
        if (json.success) {
          let chatArray = json.jsonChatArray;
          console.log(chatArray);
          setChatArray(chatArray);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.view1}>
      <HeaderBar/>

      <FlashList
        data={getChatArray}
        renderItem={({ item }) => (
          <View style={styles.view2}>
            <View
              style={
                item.other_user_status == 1 ? styles.view3_2 : styles.view3_1
              }
            >
              {item.avatar_image_found ? (
                <Image
                  source={
                    "http://192.168.56.1:8080/Quick_Chat/AvatarImages/" +
                    item.other_user_mobile +
                    ".png"
                  }
                  contentFit="contain"
                  style={styles.image1}
                />
              ) : (
                <Text style={styles.text6}>DP</Text>
              )}
            </View>
            <View style={styles.view4}>
              <Text style={styles.text1}>{item.other_user_name}</Text>

              <View style={styles.view5}>
                <Text style={styles.text2} numberOfLines={1}>
                  {item.message}
                </Text>
              </View>
              <View style={styles.view6}>
                <FontAwesome6
                  name={"check"}
                  size={18}
                  color={item.chat_status_id == 1 ? "green" : "red"}
                />
              </View>

              <Text style={styles.text3}>{item.dateTime}</Text>
            </View>
          </View>
        )}
        estimatedItemSize={200}
      />

      <FooterNavBar/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: "center",
  },
  view2: {
    // backgroundColor:"yellow",
    padding: 15,
    flexDirection: "row",
    columnGap: 20,
    borderRadius: 20,
    borderWidth: 3,
    marginTop: 4,
  },
  view3_1: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 40,
    // borderWidth: 1,
    // borderColor: "",
  },
  view3_2: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "green",
  },
  view4: {
    flex: 1,
    // backgroundColor:"green"
  },
  view5: {
    // flex:1,
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:"flex-end"
  },
  text1: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 18,
    alignSelf: "flex-start",
  },
  text3: {
    fontSize: 14,
    alignSelf: "flex-end",
  },
  text5: {
    backgroundColor: "green",
    fontSize: 16,
    alignItems: "flex-end",
  },
  view6: {
    flex: 1,
    alignItems: "flex-end",
    // backgroundColor: "blue",
  },
});
