import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/AuthScreens/Login';
import Register from '../screens/AuthScreens/Register';
import ForgetPassword from '../screens/AuthScreens/ForgetPassword';
import NewPassword from '../screens/AuthScreens/NewPassword';
import OTPVerification from '../screens/AuthScreens/OTPVerification';
import HomeScreen from '../screens/HomeScreen';
import SafetyFeaturesScreen from '../screens/TobTabScreen/SafetyFeaturesSreen';

const Stack=createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='home'>
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='register' component={Register}/>
            <Stack.Screen name='forgetpassword' component={ForgetPassword}/>
            <Stack.Screen name='OTPverification' component={OTPVerification}/>
            <Stack.Screen name='newpassword' component={NewPassword}/>
            <Stack.Screen name="home" component={HomeScreen}/>
            <Stack.Screen name='Safety Features' component={SafetyFeaturesScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})