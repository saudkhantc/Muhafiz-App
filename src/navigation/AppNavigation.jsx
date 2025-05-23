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
import EmergencyContacts from '../screens/EmergencyContact';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import BottomTabNavigator from './BottomTabNavigation';
import AuthLoading from '../screens/AuthScreens/AuthLoading';

const Stack=createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="AuthLoading" >
        <Stack.Screen name="AuthLoading" component={AuthLoading} />
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='register' component={Register}/>
            <Stack.Screen name='forgetpassword' component={ForgetPassword}/>
            <Stack.Screen name='OTPverification' component={OTPVerification}/>
            <Stack.Screen name='Newpassword' component={NewPassword}/>
            <Stack.Screen name='BottomTab' component={BottomTabNavigator}/>
            <Stack.Screen name="home" component={HomeScreen}/>
            <Stack.Screen name='emergencyContacts' component={EmergencyContacts}/>
            <Stack.Screen name='profile' component={ProfileScreen}/>
            <Stack.Screen name='editprofile' component={EditProfile}/>

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})