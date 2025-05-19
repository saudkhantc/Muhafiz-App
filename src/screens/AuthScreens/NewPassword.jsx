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
} from 'react-native';
import React, { useState } from 'react';
import Top from '../../assets/images/Top.png';
import Logo from '../../assets/images/Logo.png';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import { BGColor, textColor } from '../../styles/Styles';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const { width, height } = Dimensions.get('window');

// ✅ Validation schema
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
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleFormSubmit = (data) => {
    console.log('New Password Submitted:', data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('login');
    }, 1000);
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
            <Image source={Top} style={styles.topImage} resizeMode="cover" />
          </View>

          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.loginText}>New Password</Text>

            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label="New Password"
                  placeholder="Enter your password"
                  isPassword={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.newPassword?.message}
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

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Submit"
                buttonwidth="90%"
                isLoading={isLoading}
                onPress={handleSubmit(handleFormSubmit)}
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

export default NewPassword;

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
