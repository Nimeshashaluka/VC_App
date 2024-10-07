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
import { HeaderBar } from "../Components/HeaderBar";
import { FooterNavBar } from "../Components/FooterNavBar";
import { useState } from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const profile = require("../assets/Images/download.jpg");
  const [getChatArray, setChatArray] = useState([]);
  const [count, setCount] = useState(0);
  const [getUser, setUser] = useState([]);

  // State for search input
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    async function fetchData() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);
      setUser(user);

      let response = await fetch(
        "http://192.168.56.1:8080/Quick_Chat/LoadHomeData?id=" + user.id
      );

      if (response.ok) {
        let json = await response.json();
        if (json.success) {
          let chatArray = json.jsonChatArray;
          // console.log(chatArray);
          setChatArray(chatArray);

          // console.log("ok done");
        }
      }
    }
    fetchData();

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      fetchData();
    }, 1000); // Updates every second

    // Cleanup function to clear the interval when the component unmounts or you navigate away
    return () => {
      clearInterval(intervalId);
    };
  }, []);

   // Filter chats based on the search query
   const filteredChats = getChatArray.filter((chat) =>
    chat.other_user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.view1}>
      {/* <HeaderBar /> */}
      <View style={styles.hview2}>
        <View style={styles.hview3}>
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
        <View style={styles.hview4}>
          <TextInput
            style={styles.hinput1}
            inputMode={"text"}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)} // Update search query
          />
        </View>
        <View style={styles.hview5}>
          {getUser.mobile ? (
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
          ) : (
            <Image source={profile} style={styles.profile} />
          )}
        </View>
      </View>

      <FlashList
        data={filteredChats} // Use filtered chats
        renderItem={({ item }) => (
          <Pressable
            style={styles.view2}
            onPress={() => {
              // Alert.alert("View Chat", "User : " + item.other_user_id);
              navigation.navigate("Chat", {
                other_user_id: item.other_user_id,
                userInfo: item,
              });
            }}
          >
            <View
              style={
                item.other_user_status == 1 ? styles.view3_2 : styles.view3_1
              }
            >
              {item.avatar_image_found ? (
                <Image
                  source={{
                    uri:
                      "http://192.168.56.1:8080/Quick_Chat/AvatarImages/" +
                      item.other_user_mobile +
                      ".png",
                  }}
                  contentFit="contain"
                  style={styles.image1}
                />
              ) : (
                <Image source={profile} style={styles.image1} />
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
                  color={item.chat_status_id == 1 ? "blue" : "black"}
                />
              </View>

              <Text style={styles.text3}>{item.date_time}</Text>
            </View>
          </Pressable>
        )}
        estimatedItemSize={200}
      />

      <FooterNavBar />
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
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  view3_2: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "green",
    justifyContent: "center",
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
  text6: {
    fontSize: 28,
    fontWeight: "bold",
    // justifyContent:'flex-end',
    alignSelf: "center",
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
  hview2: {
    height: 70,
    backgroundColor: "#00BFA6",
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  hview3: {
    width: 100,
    paddingStart: 20,
    // backgroundColor: "yellow",
  },
  hview4: {
    flex: 1,
    // backgroundColor: "green",
    alignItems: "center",
  },
  hview5: {
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
  hinput1: {
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
