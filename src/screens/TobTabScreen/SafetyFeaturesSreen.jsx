import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import { textColor } from '../../styles/Styles';

const { width, height } = Dimensions.get('window');

const featureData = [
  {
    title: 'Location Sharing',
    description: 'Share your real-time location with trusted contacts',
    icon: 'map-marker',
    iconColor: '#6200ea',
    bgColor: '#e8ddff',
  },
  {
    title: 'Safety Alerts',
    description: 'Get notifications about incidents in your area',
    icon: 'bell-ring',
    iconColor: '#d4007a',
    bgColor: '#ffe8f5',
  },
  {
    title: 'Safety Tips',
    description: 'Access valuable safety information and resources',
    icon: 'book-open-page-variant',
    iconColor: '#6200ea',
    bgColor: '#e8ddff',
  },
  {
    title: 'Emergency Info',
    description: 'Store medical and personal information for emergencies',
    icon: 'file-document',
    iconColor: '#6200ea',
    bgColor: '#e8ddff',
  },
];

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Permission',
        message: 'This app needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const SafetyFeaturesScreen = () => {
  const [location, setLocation] = useState(null);

  const handleLocationSharingPress = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const message = `Here's my location: https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
      },
      (error) => {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch location.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleFeaturePress = (title) => {
    if (title === 'Location Sharing') {
      handleLocationSharingPress();
    } else {
      Alert.alert(title, 'Feature tapped.');
      // Or implement other feature logic here.
    }
  };

  return (
    <View style={styles.featuresContainer}>
      <Text style={styles.featuresSectionTitle}>Safety Features</Text>

      {featureData.map((feature, index) => (
        <TouchableOpacity
          key={index}
          style={styles.featureItem}
          onPress={() => handleFeaturePress(feature.title)}
          activeOpacity={0.7}
        >
          <View style={[styles.featureIcon, { backgroundColor: feature.bgColor }]}>
            <Icon name={feature.icon} size={width * 0.05} color={feature.iconColor} />
          </View>
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  featuresContainer: {
    paddingTop: height * 0.01,
  },
  featuresSectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: textColor.color3,
    marginBottom: height * 0.02,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    marginBottom: height * 0.015,
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color:textColor.color3,
    marginBottom: height * 0.005,
  },
  featureDescription: {
    fontSize: width * 0.03,
    color: '#666',
  },
});

export default SafetyFeaturesScreen;
