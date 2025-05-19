import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { textColor } from '../styles/Styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawer from './CustomDrawer'; 
import Logo from '../assets/images/Logo.png'
const {width,height}=Dimensions.get('window');

const CustomHeader = ({ navigation }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <View style={styles.header}>
       <View style={styles.logoContainer}>
  <Image source={Logo} style={styles.logoImage} resizeMode='cover' />
  <Text style={styles.logoText}>Muhafiz</Text>
</View>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setDrawerVisible(true)}
        >
          <Icon name="menu" size={width * 0.08} color={textColor.color3} />
        </TouchableOpacity>
      </View>
      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />
    </>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    header: {
    padding: width * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: width * 0.15,
    height: width * 0.15,
 
  },
  logoText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: textColor.color3,
  },
  menuButton: {
    padding: width * 0.01,
  },
})