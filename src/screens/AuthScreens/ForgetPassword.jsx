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
  Dimensions,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import Top from '../../assets/images/Top.png';
import Logo from '../../assets/images/Logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import { BGColor, textColor } from '../../styles/Styles';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { forgotPassword } from '../../services.js/AuthServices';

const { width, height } = Dimensions.get('window');

// ✅ Yup schema for validation
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ useForm with schema and default value
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

const handleSubmitForm = async (data) => {
  setIsLoading(true);
  console.log('Forgot Password Email:', data);

  try {
    const response = await forgotPassword(data.email); // ✅ use the service

    console.log('Forgot Password response:', response);

    Alert.alert('Success', response?.message || 'OTP sent successfully!');
    navigation.navigate('OTPverification', { email: data.email });

  } catch (error) {
    console.error('Forgot Password error:', error);
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong.';

    Alert.alert(
      'Error',
      typeof message === 'string' &&
        (message.includes('Network') || message.includes('timeout'))
        ? 'Please check your internet connection or ensure the backend is running.'
        : message
    );
  } finally {
    setIsLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.02 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.backButtonContainer}>
            <BackButton onPress={() => navigation.goBack()} />
          </View>

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
            <Text style={styles.loginText}>Forgot Password</Text>

            {/* ✅ Controlled Email Field with Validation */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label='Email Address'
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

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Submit"
                buttonwidth='90%'
                isLoading={isLoading}
                onPress={handleSubmit(handleSubmitForm)}
              />
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.registerText}>Already Member? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('register')}>
                <Text style={[styles.registerText, { fontWeight: '700' }]}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

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
  backButtonContainer: {
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.05,
    zIndex: 1,
  },
  header: {
    width: '100%',
    height: height * 0.14,
  },
  topImage: {
    width: '100%',
    height: '100%',
    tintColor: 'pink',
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
  buttonContainer: {
    alignItems: 'center',
    marginVertical: height * 0.03,
  },
  bottomContainer: {
    marginHorizontal: width * 0.08,
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    alignSelf: 'center',
  },
  registerText: {
    color: textColor.color1,
    fontSize: 14,
    marginBottom: 12,
  },
});
