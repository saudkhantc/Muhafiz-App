import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

const SafetyFeaturesScreen = () => {
  return (
    <View style={styles.featuresContainer}>
      <Text style={styles.featuresSectionTitle}>Safety Features</Text>

      {featureData.map((feature, index) => (
        <TouchableOpacity key={index} style={styles.featureItem}>
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
