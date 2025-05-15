// import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react';
// import { BGColor, textColor } from '../styles/Styles';
// import Entypo from 'react-native-vector-icons/Entypo'; 

// const { height, width } = Dimensions.get('window');

// const CustomTextInput = ({ label, placeholder, value, onChangeText, keyboardType, isPassword }) => {
//   const [secureText, setSecureText] = useState(isPassword);

//   return (
//     <View style={styles.inputcontainer}>
//       <Text style={styles.label}>{label}</Text>

//       <View style={[styles.inputWrapper]}>
//         <TextInput
//           style={styles.innput}
//           placeholder={placeholder}
//           placeholderTextColor={textColor.color1 + '80'}
//           value={value}
//           onChangeText={onChangeText}
//           secureTextEntry={secureText}
//           keyboardType={keyboardType}
//         />
//         {isPassword && (
//           <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={() => setSecureText(!secureText)}
//           >
//             <Entypo
//               name={secureText ? 'eye-with-line' : 'eye'}
//               size={24}
//               color={BGColor.bgcolor2} 
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// export default CustomTextInput;

// const styles = StyleSheet.create({
//   inputcontainer: {
//     marginVertical: height * 0.01,
//     width: '100%',
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     backgroundColor: BGColor.bgcolor1,
//     borderColor: BGColor.brcolor,
//     borderRadius: 8,
//   },
//   label: {
//     fontSize: width * 0.04,
//     color: textColor.color1,
//     margin: height * 0.01,
//   },
//   innput: {
//     flex: 1,
//     height: height * 0.065,
//     color: textColor.color1,
//     paddingHorizontal: width * 0.03,
//     fontSize: width * 0.04,
//   },
//   eyeIcon: {
//     paddingHorizontal: width * 0.03,
//   },
// });

import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { BGColor, textColor } from '../styles/Styles';
import Entypo from 'react-native-vector-icons/Entypo'; 

const { height, width } = Dimensions.get('window');

const CustomTextInput = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType, 
  isPassword, 
  error, 
  onBlur 
}) => {
  const [secureText, setSecureText] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputcontainer}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[
        styles.inputWrapper, 
        isFocused && styles.focusedInput,
        error && styles.errorBorder
      ]}>
        <TextInput
          style={styles.innput}
          placeholder={placeholder}
          placeholderTextColor={textColor.color1 + '80'}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureText}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecureText(!secureText)}
          >
            <Entypo
              name={secureText ? 'eye-with-line' : 'eye'}
              size={24}
              color={BGColor.bgcolor2} 
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputcontainer: {
    marginVertical: height * 0.01,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: BGColor.bgcolor1,
    borderColor: BGColor.brcolor,
    borderRadius: 8,
  },
//   focusedInput: {
//     borderColor: '#4A90E2',
//   },
  errorBorder: {
    borderColor: textColor.color1,
  },
  label: {
    fontSize: width * 0.04,
    color: textColor.color1,
    margin: height * 0.01,
  },
  innput: {
    flex: 1,
    height: height * 0.065,
    color: textColor.color1,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.04,
  },
  eyeIcon: {
    paddingHorizontal: width * 0.03,
  },
  errorText: {
    color: textColor.color1+'80',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  }
});
