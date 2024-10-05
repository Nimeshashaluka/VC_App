import { StyleSheet, Text, View } from "react-native";

export default function Contact(){
    return(
        <View style={styles.view1}>
            <Text>Hello Contact</Text>
        </View>
    );
}

const styles =StyleSheet.create({
    view1:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});