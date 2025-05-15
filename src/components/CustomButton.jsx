import { TouchableOpacity, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import React from 'react';
import { BGColor } from '../styles/Styles';

const { width, height } = Dimensions.get('window');

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  isLoading = false,
  disabled = false,
  backgroundColor = BGColor.bgcolor2,
  textColor = 'black',
  buttonwidth="40%"
}) => {
  return (
    <TouchableOpacity
      style={[
         styles.button,
        { backgroundColor ,width:buttonwidth},
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: height * 0.02,
    borderRadius: width * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: width * 0.045,
    fontWeight: '700',
    
  },
  disabledButton: {
    opacity: 0.6,
  }
});

export default CustomButton;