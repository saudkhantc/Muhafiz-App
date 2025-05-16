import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { textColor } from '../styles/Styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawer from './CustomDrawer'; // Import your CustomDrawer component

const {width,height}=Dimensions.get('window');

const CustomHeader = ({ navigation }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.logoText}>Muhafiz</Text>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setDrawerVisible(true)}
        >
          <Icon name="menu" size={width * 0.06} color={textColor.color3} />
        </TouchableOpacity>
      </View>

      {/* Custom Drawer Component */}
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
        padding: width * 0.04,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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