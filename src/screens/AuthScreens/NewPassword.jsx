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
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

import Top from '../../assets/images/Top.png';
import Logo from '../../assets/images/Logo.png';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import { BGColor, textColor } from '../../styles/Styles';
import { resetPassword } from '../../services.js/AuthServices';

const { width, height } = Dimensions.get('window');

// ✅ Yup schema
const NewPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const NewPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {}; // ✅ Get email from navigation params

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });


  const handleFormSubmit = async (data) => {
  setIsLoading(true);
  try {
    const response = await resetPassword(email, data.newPassword);

    console.log('Reset response:', response);

    if (
      response?.success === true ||
      response?.message?.toLowerCase().includes('reset successful')
    ) {
      alert('Password reset successful');
      navigation.navigate('login');
    } else {
      alert(response.message || 'Password reset failed');
    }
  } catch (error) {
    console.error('Reset password error:', error);
    alert('Network error. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.02 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.backButtonContainer}>
            <BackButton onPress={() => navigation.goBack()} />
          </View>

          <View style={styles.header}>
            <Image source={Top} style={styles.topImage} resizeMode="cover" />
          </View>

          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your new password below</Text>

            {/* New Password Field */}
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="New Password"
                  placeholder="Enter new password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={errors.newPassword?.message}
                />
              )}
            />

            {/* Confirm Password Field */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={errors.confirmPassword?.message}
                />
              )}
            />

            <View style={{ marginTop: 20 }}>
              <CustomButton
                title="Reset Password"
                buttonwidth="100%"
                isLoading={isLoading}
                onPress={handleSubmit(handleFormSubmit)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGColor.bgcolor,
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
  contentContainer: {
    paddingHorizontal: width * 0.08,
    marginTop: height * 0.01,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: textColor.color1,
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: textColor.color1,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: height * 0.03,
  },
});
