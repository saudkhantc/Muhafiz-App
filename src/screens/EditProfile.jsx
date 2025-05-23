import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BackButton from '../components/BackButton';
import CustomTextInput from '../components/CustomTextInput';
import { updateUserProfile } from '../services.js/AuthServices';

const { width, height } = Dimensions.get('window');

const EditProfile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  // Load user data from AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          setProfile({
            fullname: parsedUser.fullname || '',
            email: parsedUser.email || '',
            phoneNumber: parsedUser.phoneNumber || '',
            address: parsedUser.address || '',
        
          });
        } else {
          Alert.alert('Error', 'User not authenticated');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleImagePicker = () => {
    Alert.alert(
      'Select Option',
      'Choose image from...',
      [
        {
          text: 'Camera',
          onPress: () =>
            launchCamera({ mediaType: 'photo', quality: 0.5 }, (response) => {
              if (!response.didCancel && !response.errorCode) {
                setProfileImage(response.assets[0].uri);
              }
            }),
        },
        {
          text: 'Gallery',
          onPress: () =>
            launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
              if (!response.didCancel && !response.errorCode) {
                setProfileImage(response.assets[0].uri);
              }
            }),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // const handleSave = async () => {
  //   try {
  //     const storedUser = await AsyncStorage.getItem('user');
  //     if (!storedUser) {
  //       Alert.alert('Error', 'User not authenticated');
  //       return;
  //     }

  //     const { _id } = JSON.parse(storedUser);
  //     await axios.put(`http://192.168.10.12:5000/api/users/update/${_id}`, profile);
  //     Alert.alert('Success', 'Profile updated successfully');
  //     navigation.goBack();
  //   } catch (error) {
  //     console.error('Failed to update profile:', error);
  //     Alert.alert('Error', 'Failed to update profile');
  //   }
  // };


const handleSave = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    const { _id, token } = JSON.parse(storedUser);

    const updatedData = {
      fullname: profile.fullname,
      email: profile.email,
      address: profile.address,
    };

    await axios.put(
      `https://muhafizapp-backend-phf9.onrender.com/api/users/update/${_id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
     if (profileImage) {
  await AsyncStorage.setItem('profileImage', profileImage);
}
    Alert.alert('Success', 'Profile updated successfully');
    navigation.goBack();
  } catch (error) {
    console.error('Failed to update profile:', error.response?.data || error.message);
    Alert.alert('Error', 'Failed to update profile');
  }
};


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{ marginBottom: height * 0.02 }}>
        <BackButton color="black" />
      </View>

      <Text style={styles.header}>Personal Information</Text>

      <TouchableOpacity onPress={handleImagePicker} style={styles.imageWrapper}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/images/Logo.png')}
          style={styles.image}
        />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <CustomTextInput
          bgColor="#6663"
          borderColor="#666"
          textColor="black"
          value={profile.fullname}
          onChangeText={(text) => setProfile({ ...profile, fullname: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <CustomTextInput
          bgColor="#6663"
          borderColor="#666"
          textColor="black"
          value={profile.email}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
        />
      </View>

    
      <View style={styles.inputContainer}>
  <Text style={styles.label}>Home Address</Text>
  <CustomTextInput
    bgColor="#6663"
    borderColor="#666"
    textColor="black"
    value={profile.address}
    onChangeText={(text) => setProfile({ ...profile, address: text })}
  />
</View>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <CustomTextInput
          bgColor="#6663"
          borderColor="#666"
          textColor="black"
          keyboardType="phone-pad"
          value={profile.phoneNumber}
          onChangeText={(text) => setProfile({ ...profile, phoneNumber: text })}
        />
      </View> */}
{/* 
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medical Information</Text>
        <CustomTextInput
          bgColor="#6663"
          borderColor="#666"
          textColor="black"
          value={profile.medicalInfo}
          onChangeText={(text) => setProfile({ ...profile, medicalInfo: text })}
          multiline
        />
      </View> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: width * 0.05,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 40,
  },
  editText: {
    color: '#6200ea',
    marginTop: 6,
    fontWeight: '600',
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: height * 0.01,
  },
  label: {
    fontSize: width * 0.04,
    color: '#333',
    fontWeight: '600',
    marginBottom: height * 0.008,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.05,
  },
  button: {
    width: width * 0.4,
    paddingVertical: height * 0.02,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#6200ea',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default EditProfile;
