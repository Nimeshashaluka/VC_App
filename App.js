import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from "./Pages/StartPage";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Profile from './Pages/Profile';
import Contact from './Pages/Contact';
import Chat from './Pages/Chat';

const Stack = createNativeStackNavigator();


export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown:false}}/>
        <Stack.Screen name="LogIn" component={LogIn} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="Contact" component={Contact} options={{headerShown:false}}/>
        <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}