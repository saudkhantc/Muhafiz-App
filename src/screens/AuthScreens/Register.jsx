
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import React, { useState } from 'react'
import Top from '../../assets/images/Top.png'
import Logo from '../../assets/images/Logo.png'

import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import SocialLogin from '../../components/SocialLogin';
import { BGColor, textColor } from '../../styles/Styles';
import CustomButton from '../../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser } from '../../services.js/AuthServices';


const { width, height } = Dimensions.get('window');
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});



const Register = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

//  const handleRegister = async (data) => {
//   console.log('Register button clicked with data:', data);
//   setIsLoading(true);

//   try {
//     const response = await axios.post('http://localhost:5000/api/users/register', {
//       fullname: data.name,
//       email: data.email,
//       password: data.password,
//       confirmPassword: data.confirmPassword,
//     });

//     console.log('Registration successful:', response.data);

//     // Save token or user info to AsyncStorage
//     await AsyncStorage.setItem('user', JSON.stringify(response.data));

//     Alert.alert('Success', 'Registration completed. Please login.');
//     navigation.navigate('login');
//   } catch (error) {
//     console.error('Registration error:', error);
//     const message =
//       error?.response?.data?.message ||
//       error?.message ||
//       'Registration failed.';
//     Alert.alert(
//       'Error',
//       typeof message === 'string' &&
//         (message.includes('Network') || message.includes('timeout'))
//         ? 'Please check your internet or ensure the backend is running.'
//         : message
//     );
//   } finally {
//     setIsLoading(false);
//   }
// };

const handleRegister = async (data) => {
  setIsLoading(true);
  try {
    const response = await registerUser({
      fullname: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    await AsyncStorage.setItem('user', JSON.stringify(response));

    Alert.alert('Success', 'Registration completed. Please login.');
    navigation.navigate('login');
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Registration failed.';
    Alert.alert(
      'Error',
      message.includes('Network') || message.includes('timeout')
        ? 'Please check your internet or ensure the backend is running.'
        : message
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image
              source={Top}
              style={styles.topImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.logoContainer}>
            <Image
              source={Logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.loginText}>Register</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="Full Name"
                  placeholder="Enter Your Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="Password"
                  placeholder="Enter your password"
                  isPassword={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  isPassword={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.confirmPassword?.message}
                />
              )}
            />


            <View style={{ marginVertical: 10 }}>
              <SocialLogin
                icons={[
                  require('../../assets/images/google.png'),
                  require('../../assets/images/facebook.png'),
                  require('../../assets/images/apple.png'),
                ]}
                onPressHandlers={[
                  () => console.log('Google pressed'),
                  () => console.log('Facebook pressed'),
                  () => console.log('Twitter pressed'),
                ]}
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.registerText}>Already Member? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={[styles.registerText, { fontWeight: '700' }]}>Login</Text></TouchableOpacity>
            </View>
            <CustomButton
              title="Register"
              onPress={handleSubmit(handleRegister)}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGColor.bgcolor,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    // paddingBottom: height * 0.03,
  },
  header: {
    width: '100%',
    height: height * 0.14,
  },
  topImage: {
    width: '100%',
    height: '100%',
    tintColor: 'pink'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * -0.1,
    marginBottom: height * 0.01,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  formContainer: {
    paddingHorizontal: width * 0.08,
    marginTop: height * 0.01,
  },
  loginText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: textColor.color1,
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  bottomContainer: {
    marginHorizontal: width * 0.08,
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5
  },
  registerText: {
    color: textColor.color1,
    fontSize: 14,
    marginBottom: 12,
  },
})


// import {
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   Dimensions
// } from 'react-native'
// import React, { useState } from 'react'
// import Top from '../../assets/images/Top.png'
// import Logo from '../../assets/images/Logo.png'

// import { useNavigation } from '@react-navigation/native';
// import CustomTextInput from '../../components/CustomTextInput';
// import SocialLogin from '../../components/SocialLogin';
// import { BGColor, textColor } from '../../styles/Styles';
// import CustomButton from '../../components/CustomButton';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { Alert } from 'react-native';
// import { registerUser } from '../../services/authServices';
// import api from '../../services/Api';
// import endpoints from '../../services/Endpoint';

// const { width, height } = Dimensions.get('window');
// const RegisterSchema = Yup.object().shape({
//   name: Yup.string().required('Full name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Confirm Password is required'),
// });



// const Register = () => {
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false);
 
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(RegisterSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//   });


// const handleRegister = async (data) => {
//   setIsLoading(true);
//   try {
//     const response = await registerUser({
//       fullname: data.name,
//       email: data.email,
//       password: data.password,
//       confirmPassword: data.confirmPassword,
//     });

//     Alert.alert('Success', 'Registration completed. Please login.');
//     navigation.navigate('login');
//   } catch (error) {
//     Alert.alert(
//       'Error',
//       error.message.includes('Network') || error.message.includes('timeout')
//         ? 'Please check your internet or ensure the backend is running.'
//         : error.message
//     );
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={styles.keyboardAvoidingContainer}
//         behavior="padding"
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.header}>
//             <Image
//               source={Top}
//               style={styles.topImage}
//               resizeMode="cover"
//             />
//           </View>
//           <View style={styles.logoContainer}>
//             <Image
//               source={Logo}
//               style={styles.logo}
//               resizeMode="contain"
//             />
//           </View>

//           <View style={styles.formContainer}>
//             <Text style={styles.loginText}>Register</Text>
//             <Controller
//               control={control}
//               name="name"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomTextInput
//                   label="Full Name"
//                   placeholder="Enter Your Name"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   error={errors.name?.message}
//                 />
//               )}
//             />

//             <Controller
//               control={control}
//               name="email"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomTextInput
//                   label="Email"
//                   placeholder="Enter your email"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   error={errors.email?.message}
//                 />
//               )}
//             />

//             <Controller
//               control={control}
//               name="password"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomTextInput
//                   label="Password"
//                   placeholder="Enter your password"
//                   isPassword={true}
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   error={errors.password?.message}
//                 />
//               )}
//             />
//             <Controller
//               control={control}
//               name="confirmPassword"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomTextInput
//                   label="Confirm Password"
//                   placeholder="Re-enter your password"
//                   isPassword={true}
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   error={errors.confirmPassword?.message}
//                 />
//               )}
//             />


//             <View style={{ marginVertical: 10 }}>
//               <SocialLogin
//                 icons={[
//                   require('../../assets/images/google.png'),
//                   require('../../assets/images/facebook.png'),
//                   require('../../assets/images/apple.png'),
//                 ]}
//                 onPressHandlers={[
//                   () => console.log('Google pressed'),
//                   () => console.log('Facebook pressed'),
//                   () => console.log('Twitter pressed'),
//                 ]}
//               />
//             </View>
//           </View>
//           <View style={styles.bottomContainer}>
//             <View style={{ flexDirection: 'row' }}>
//               <Text style={styles.registerText}>Already Member? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('login')}>
//                 <Text style={[styles.registerText, { fontWeight: '700' }]}>Login</Text></TouchableOpacity>
//             </View>
//             <CustomButton
//               title="Register"
//               onPress={handleSubmit(handleRegister)}
//               isLoading={isLoading}
//             />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   )
// }

// export default Register

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: BGColor.bgcolor,
//   },
//   keyboardAvoidingContainer: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     // paddingBottom: height * 0.03,
//   },
//   header: {
//     width: '100%',
//     height: height * 0.14,
//   },
//   topImage: {
//     width: '100%',
//     height: '100%',
//     tintColor: 'pink'
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: height * -0.1,
//     marginBottom: height * 0.01,
//   },
//   logo: {
//     width: width * 0.4,
//     height: width * 0.4,
//   },
//   formContainer: {
//     paddingHorizontal: width * 0.08,
//     marginTop: height * 0.01,
//   },
//   loginText: {
//     fontSize: width * 0.08,
//     fontWeight: 'bold',
//     color: textColor.color1,
//     marginBottom: height * 0.01,
//     textAlign: 'center',
//   },
//   bottomContainer: {
//     marginHorizontal: width * 0.08,
//     flex: 2,
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     marginBottom: 10,
//     marginTop: 5
//   },
//   registerText: {
//     color: textColor.color1,
//     fontSize: 14,
//     marginBottom: 12,
//   },
// })
