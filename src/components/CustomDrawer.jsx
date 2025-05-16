import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '../assets/images/Logo.png'; 
import { textColor } from '../styles/Styles';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const CustomDrawer = ({visible, onClose}) => {
    const navigation=useNavigation();
  const translateX = new Animated.Value(-width);

  React.useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      {/* Overlay */}
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Drawer Content */}
      <Animated.View style={[styles.drawer, {transform: [{translateX}]}]}>
        <View style={styles.drawerHeader}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.appName}>Muhafiz</Text>
        </View>

        {/* Navigation Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('home')}
          >
            <Icon name="home" size={24} color={textColor.color3} />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('profile')}
          >
            <Icon name="person" size={24} color={textColor.color3} />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('emergencyContacts')}
          >
            <Icon name="contacts" size={24} color={textColor.color3} />
            <Text style={styles.menuText}>Emergency Contacts</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('NearbyFacilities')}
          >
            <Icon name="local-hospital" size={24} color={textColor.color3} />
            <Text style={styles.menuText}>Nearby Facilities</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('Resources')}
          >
            <Icon name="menu-book" size={24} color={textColor.color3} />
            <Text style={styles.menuText}>Safety Resources</Text>
          </TouchableOpacity> */}

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigateTo('editprofile')}
          >
            <Icon name="settings" size={24} color={textColor.color3} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => {
              // Handle logout
              onClose();
            }}
          >
            <Icon name="exit-to-app" size={24} color="#ff4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#fff',
    padding: width * 0.05,
    paddingTop: height * 0.05,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: height * 0.03,
  },
  logo: {
    width: width * 0.15,
    height: width * 0.15,
    marginRight: width * 0.03,
  },
  appName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: textColor.color3,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuText: {
    fontSize: width * 0.04,
    fontWeight:'700',
    color: '#333',
    marginLeft: width * 0.05,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: height * 0.02,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015,
  },
  logoutText: {
    fontSize: width * 0.045,
    color: '#ff4444',
    marginLeft: width * 0.05,
    fontWeight: '500',
  },
});

export default CustomDrawer;