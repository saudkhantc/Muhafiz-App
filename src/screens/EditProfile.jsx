// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
//   Image
// } from 'react-native';
// import BackButton from '../components/BackButton';
// import CustomTextInput from '../components/CustomTextInput';

// const { width, height } = Dimensions.get('window');

// const EditProfile = ({ navigation }) => {
//   const [profile, setProfile] = useState({
//     fullName: 'Jane Doe',
//     phoneNumber: '555-123-4567',
//     homeAddress: '123 Main Street, Anytown, USA',
//     medicalInfo: 'No allergies. Blood type: O+'
//   });

//   const handleSave = () => {
//     // Save logic here
//     navigation.goBack();
//   };

//   const handleCancel = () => {
//     navigation.goBack();
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={{ marginBottom: height * 0.02 }}>
//         <BackButton color='black' />
//       </View>

//       <Text style={styles.header}>Personal Information</Text>
//         <TouchableOpacity>
//            <Image style={styles.image}/>
//         </TouchableOpacity>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Full Name</Text>
//         <CustomTextInput
//           bgColor="#6663"
//           borderColor="#666"
//           textColor="black"
//           value={profile.fullName}
//           onChangeText={(text) => setProfile({ ...profile, fullName: text })}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Phone Number</Text>
//         <CustomTextInput
//           bgColor="#6663"
//           borderColor="#666"
//           textColor="black"
//           keyboardType="phone-pad"
//           value={profile.phoneNumber}
//           onChangeText={(text) => setProfile({ ...profile, phoneNumber: text })}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Home Address</Text>
//         <CustomTextInput
//           bgColor="#6663"
//           borderColor="#666"
//           textColor="black"
//           value={profile.homeAddress}
//           onChangeText={(text) => setProfile({ ...profile, homeAddress: text })}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Medical Information</Text>
//         <CustomTextInput
//           bgColor="#6663"
//           borderColor="#666"
//           textColor="black"
//           value={profile.medicalInfo}
//           onChangeText={(text) => setProfile({ ...profile, medicalInfo: text })}
//           multiline={true}
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     padding: width * 0.05,
//   },
//   image:{
//     width:60,
//     height:60,
//     backgroundColor:'black',
//     alignSelf:'center',
//     borderRadius:30
// },
//   header: {
//     fontSize: width * 0.06,
//     fontWeight: 'bold',
//     color: '#6200ea',
//     marginBottom: height * 0.04,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: height * 0.01,
//   },
//   label: {
//     fontSize: width * 0.04,
//     color: '#333',
//     fontWeight: '600',
//     marginBottom: height * 0.008,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: height * 0.05,
//   },
//   button: {
//     width: width * 0.4,
//     paddingVertical: height * 0.02,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   saveButton: {
//     backgroundColor: '#6200ea',
//   },
//   cancelButton: {
//     backgroundColor: '#f0f0f0',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: width * 0.04,
//     fontWeight: 'bold',
//   },
//   cancelButtonText: {
//     color: '#666',
//     fontSize: width * 0.04,
//     fontWeight: 'bold',
//   },
// });

// export default EditProfile;

import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import BackButton from '../components/BackButton';
import CustomTextInput from '../components/CustomTextInput';

const { width, height } = Dimensions.get('window');

const EditProfile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState({
    fullName: 'Jane Doe',
    phoneNumber: '555-123-4567',
    homeAddress: '123 Main Street, Anytown, USA',
    medicalInfo: 'No allergies. Blood type: O+',
  });

  const handleSave = () => {
    // Save logic here
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleImagePicker = () => {
    Alert.alert(
      'Select Option',
      'Choose image from...',
      [
        {
          text: 'Camera',
          onPress: () => launchCamera(
            { mediaType: 'photo', quality: 0.5 },
            (response) => {
              if (!response.didCancel && !response.errorCode) {
                setProfileImage(response.assets[0].uri);
              }
            }
          ),
        },
        {
          text: 'Gallery',
          onPress: () => launchImageLibrary(
            { mediaType: 'photo', quality: 0.5 },
            (response) => {
              if (!response.didCancel && !response.errorCode) {
                setProfileImage(response.assets[0].uri);
              }
            }
          ),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{ marginBottom: height * 0.02 }}>
        <BackButton color='black' />
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
          value={profile.fullName}
          onChangeText={(text) => setProfile({ ...profile, fullName: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <CustomTextInput
          bgColor="#6663"
          borderColor="#666"
          textColor="black"
          keyboardType="phone-pad"
          value={profile.phoneNumber}
          onChangeText={(text) => setProfile({ ...profile, phoneNumber: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Home Address</Text>
        <CustomTextInput
          bgColor="#6663"
          borderColor="#666"
          textColor="black"
          value={profile.homeAddress}
          onChangeText={(text) => setProfile({ ...profile, homeAddress: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medical Information</Text>
        <CustomTextInput
          bgColor="#6663"
          borderColor="#666"
          textColor="black"
          value={profile.medicalInfo}
          onChangeText={(text) => setProfile({ ...profile, medicalInfo: text })}
          multiline={true}
        />
      </View>

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
