import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BGColor, textColor } from '../../styles/Styles';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import Top from '../../assets/images/Top.png';
import Logo from '../../assets/images/Logo.png';

const { width, height } = Dimensions.get('window');

const OTPVerification = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    setIsLoading(true);
    const enteredOtp = otp.join('');
    console.log('OTP entered:', enteredOtp);

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('newpassword');
    }, 1500);
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

          <View style={styles.contentContainer}>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>
              We have sent a verification code to your email
            </Text>

            <View style={styles.otpContainer}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  value={otp[index]}
                  ref={(ref) => (otpInputs.current[index] = ref)}
                  selectTextOnFocus
                />
              ))}
            </View>

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive code? </Text>
              <TouchableOpacity>
                <Text style={[styles.resendText, { fontWeight: '700' }]}>Resend OTP</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                         <CustomButton
                           title="Verify"
                           buttonwidth='90%'
                           isLoading={isLoading}
                           onPress={handleVerify}
                         />
                       </View>
                     
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPVerification;
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.04,
  },
  otpInput: {
    width: width * 0.12,
    height: width * 0.15,
    borderWidth: 1,
    borderColor: BGColor.brcolor,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: width * 0.06,
    color: textColor.color1,
    backgroundColor: BGColor.bgcolor1,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.04,
  },
  resendText: {
    fontSize: width * 0.035,
    color: textColor.color1,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
