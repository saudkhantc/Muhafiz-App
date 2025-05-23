
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { loginUser } from '../../services.js/AuthServices';

const { width, height } = Dimensions.get('window');

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

const handleLogin = async (data) => {
  setIsLoading(true);
  console.log('Login button clicked with data:', data);

  try {
    const response = await loginUser(data); 
    console.log('Login successful:', response);
  
    await AsyncStorage.setItem('user', JSON.stringify(response));

    Alert.alert('Success', 'Logged in successfully!');
    navigation.navigate('BottomTab');
  } catch (error) {
    console.error('Login error:', error);
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Login failed.';

    Alert.alert(
      'Error',
      typeof message === 'string' &&
        (message.includes('Network') || message.includes('timeout'))
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
            <Text style={styles.loginText}>Login</Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label='Email'
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
            
            <TouchableOpacity onPress={() => navigation.navigate('forgetpassword')}>
              <Text style={styles.passwordText}>Forget Password?</Text>
            </TouchableOpacity>

            <View>
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
              <Text style={styles.registerText}>New Here? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('register')}>
                <Text style={[styles.registerText, { fontWeight: '700' }]}>Register</Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              title="Login"
              onPress={handleSubmit(handleLogin)}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

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
    marginTop: height * -0.09,
    marginBottom: height * 0.01,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  formContainer: {
    paddingHorizontal: width * 0.08,
    marginTop: height * -0.03,
  },
  loginText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: textColor.color1,
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  passwordText: {
    fontSize: 12,
    color: textColor.color1,
    alignSelf: 'flex-end',
    padding: 3
  },
  bottomContainer: {
    marginHorizontal: width * 0.08,
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10
  },
  registerText: {
    color: textColor.color1,
    fontSize: 14,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginTop: 5,
  },
})