import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity ,ActivityIndicator,FlatList} from 'react-native';
import filter from 'lodash.filter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home'
import Details from './components/Details';
import CartView from './components/CartView';
import  EditCart  from './components/EditCart';

const Stack = createNativeStackNavigator();
const MyApp = () => {

  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}/>
         <Stack.Screen name="Details" component={Details} />
         <Stack.Screen name="CartView" component={CartView} />
         <Stack.Screen name="EditCart" component={EditCart} />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

export default MyApp;
