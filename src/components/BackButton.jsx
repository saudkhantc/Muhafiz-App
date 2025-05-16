import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackButton = ({ onPress, color = '#fff', size = 28, style }) => {
  const navigation=useNavigation();
  const goback=()=>{
    navigation.goBack();
  }
  return (
    <TouchableOpacity onPress={goback} style={[styles.button, style]}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 7,
    paddingVertical:16
  },
});
