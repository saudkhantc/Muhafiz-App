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

const { width, height } = Dimensions.get('window');

const Register = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
       navigation.navigate('login')
      setIsLoading(false)
    }, 1000)
  }
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
            <CustomTextInput
            label="Full Name"
             placeholder="Enter Your Name"
            />
             
            <CustomTextInput
              label='Email'
              placeholder="Enter your email"
              keyboardType="email-address"
            />

            <CustomTextInput
              label="Password"
              placeholder="Enter your password"
              isPassword={true}
            />


            <View style={{marginVertical:10}}>
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
              onPress={handleLogin}
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
    marginTop:5
  },
  registerText: {
    color: textColor.color1,
    fontSize: 14,
    marginBottom: 12,
  },
})