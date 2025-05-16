import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BGColor, textColor } from '../styles/Styles';
import HomeScreen from '../screens/HomeScreen';
import EmergencyContacts from '../screens/EmergencyContact';
import ProfileScreen from '../screens/ProfileScreen';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'emergencyContacts') {
            iconName = focused ? 'alert-circle' : 'alert-circle-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: textColor.color3,
        tabBarInactiveTintColor: BGColor.bgcolor,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,

      })}
    >
      <Tab.Screen 
        name="home" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="emergencyContacts" 
        component={EmergencyContacts} 
        options={{ title: 'Emergency' }}
      />
      <Tab.Screen 
        name="profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: width * 0.17,
    paddingBottom: width * 0.02,
    paddingTop: width * 0.02,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#fff',
  },
  tabBarLabel: {
    fontSize: width * 0.03,
    marginBottom: width * 0.01,
  },
});

export default BottomTabNavigator;