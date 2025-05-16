import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { BGColor, textColor } from '../styles/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
    const navigation=useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topheader}>
           <BackButton color='black'/>
            <TouchableOpacity style={styles.Editbutton} onPress={()=>navigation.navigate('editprofile')}>
                <Text style={styles.edittext}>Edit</Text>
            </TouchableOpacity>
        </View>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image style={styles.image}/>
        <Text style={styles.headerTitle}>Your Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your personal and emergency information</Text>
      </View>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoValue}>Jane Doe</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>555-123-4567</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoValue}>123 Main Street, Anytown, USA</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Medical Info:</Text>
          <Text style={styles.infoValue}>No allergies. Blood type: O+</Text>
        </View>
      </View>

  
      {/* Privacy Notice Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle,{color:'red'}]}>Privacy Notice</Text>
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
        
        <TouchableOpacity style={[styles.settingItem, styles.logoutButton]}>
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
    width:60,
    height:60,
    backgroundColor:'red',
    alignSelf:'center',
    borderRadius:30
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