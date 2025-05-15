import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { textColor } from '../styles/Styles';

const { width, height } = Dimensions.get('window');

const SocialLogin = ({ icons = [], onPressHandlers = [] }) => {
  return (
    <View style={styles.socialLoginContainer}>
      {icons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          style={styles.socialButton}
          onPress={onPressHandlers[index] || (() => {})}
        >
          <Image source={icon} style={styles.socialIcon} resizeMode="contain" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  socialLoginContainer: {
    flexDirection: 'row',
   // justifyContent: 'center',
    marginTop: height * 0.02,
  },
  socialButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 8,
    backgroundColor:textColor.color1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
  },
  socialIcon: {
    width: '60%',
    height: '60%',
  },
});
