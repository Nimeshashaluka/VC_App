import { useFonts } from "expo-font";
import { useEffect } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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

export default function Chat({route}) {
  const navigation = useNavigation();
  const profile = require("../assets/Images/download.jpg");
  //other user id
  const { other_user_id } = route.params;
  const { userInfo } = route.params;
  console.log(other_user_id);
  console.log(userInfo);
  //store chat array
  const [getChatArray, setChatArray] = useState([]);

  //fetch chat array from server
  useEffect(() => {
    async function fetchChatArray() {
      let response = await fetch(
        "http://192.168.56.1:8080/Quick_Chat/LoadChat?userId=2&otherUserId=5"
      );
      if (response.ok) {
        let chatArray = await response.json();
        // console.log(chatArray);
        setChatArray(chatArray);
      }
    }
    fetchChatArray();
  }, []);

  return (
    <SafeAreaView style={styles.view1} >
      <ChatHeaderBar />
      
      <FlashList
        data={getChatArray}
        renderItem={({ item }) => 

          <View style={item.side=="right"?styles.view4_1:styles.view4_2}>
            <Text style={styles.text4}>{item.message}</Text>
            <View style={styles.view5}>
              <Text style={styles.text5}>{item.date_time}</Text>
              
              {
                item.side == "right" ? 
                <FontAwesome6
                name={"check"}
                color={item.status == 1 ? "blue" : "black"}
                size={20}
              />:null
              }
             
            </View>
          </View>
        }
        estimatedItemSize={200}
      />

      <MessageBar />
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
});
