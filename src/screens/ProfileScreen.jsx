import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import { BGColor, textColor } from '../styles/Styles';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    const storedImage = await AsyncStorage.getItem('profileImage');
    if (storedUser) {
      setUser({
        ...JSON.parse(storedUser),
        imageUri: storedImage,
      });
    }
  } catch (error) {
    console.error('Failed to load user info:', error);
  }
};
    getUserInfo();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topheader}>
        <BackButton color='black' />
        <TouchableOpacity style={styles.Editbutton} onPress={() => navigation.navigate('editprofile')}>
          <Text style={styles.edittext}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
        <Image
      style={styles.image}
      source={
        user?.imageUri
          ? { uri: user.imageUri }
          : require('../assets/images/Logo.png')
      }
    />
          <Text style={styles.headerTitle}>Your Profile</Text>
          <Text style={styles.headerSubtitle}>Manage your personal and emergency information</Text>
        </View>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{user?.fullname || 'Not available'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user?.email || 'Not available'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoValue}>{user?.address || 'Not available'}</Text>
          </View>
          
        </View>

        {/* Privacy Notice Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: 'red' }]}>Privacy Notice</Text>
          <Text style={styles.privacyText}>
            Your information is stored locally on your device and is only shared with your emergency contacts when you trigger an SOS alert. We don't collect or transmit your personal data.
          </Text>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Notification Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Privacy Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.logoutButton]} onPress={handleLogout}>
            <Text style={[styles.settingText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
  },

  contentContainer: {
    padding: width * 0.025,
    flexGrow:1
  },
  topheader:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:10
},
Editbutton:{
    width:60,
    height:40,
  backgroundColor:textColor.color3,
  justifyContent:'center',
  alignItems:'center',

  marginTop:10,
  borderRadius:14
},
edittext:{
  fontSize:16,
  fontWeight:'700',
  color:'#fff'
},
  header: {
    marginBottom: height * 0.03,
  },
  image:{
    width: 80,
    height: 80,
    borderRadius: 40, // circle
    resizeMode: 'cover',
    alignSelf: 'center',
    backgroundColor:BGColor.bgcolor

},
  headerTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: textColor.color3,
    marginVertical: height * 0.015,
    alignSelf:'center',
  },
  headerSubtitle: {
    fontSize: width * 0.035,
    color: '#666',
  },
  section: {
    marginBottom: height * 0.05,
    backgroundColor:'#fff',
    padding:15
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: textColor.color3,
    marginBottom: height * 0.02,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: height * 0.015,
  },
  infoLabel: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#333',
    width: width * 0.25,
  },
  infoValue: {
    fontSize: width * 0.04,
    color: '#666',
    flex: 1,
  },
  privacyText: {
    fontSize: width * 0.035,
    color: '#666',
    lineHeight: height * 0.025,
  },
  settingItem: {
    padding: height * 0.02,
    borderWidth: 1,
    borderColor: '#6666',
    marginTop:10,
    borderRadius:7
  },
  settingText: {
    fontSize: width * 0.035,
    color: '#333',
    fontWeight:'700'
  },
  logoutButton: {
    marginTop: height * 0.02,
    borderWidth: 1,
  },
  logoutText: {
    color: '#ff4444',
    fontWeight: '700',
  },
});

export default ProfileScreen;