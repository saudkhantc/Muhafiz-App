import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native';
import { textColor } from '../../styles/Styles';
import Feather from 'react-native-vector-icons/Feather'
import SafetyTips from './SafetyTips';
const { width, height } = Dimensions.get('window');


const ResourceScreen = () => {
  const resources = [
    {
      title: "National Domestic Violence Hotline",
      number: "1-800-799-7233",
      description: "Available 24/7. Provides essential tools and support for victims of domestic violence.",
      website: "https://www.thehotline.org"
    },
    {
      title: "RAINN (Rape, Abuse & Incest National Network)",
      number: "1-800-656-HOPE (4673)",
      description: "The nation's largest anti-sexual violence organization. Operates the National Sexual Assault Hotline.",
      website: "https://www.rainn.org"
    },
    {
      title: "National Human Trafficking Hotline",
      number: "1-888-373-7888",
      description: "A national anti-trafficking hotline serving victims and survivors of human trafficking.",
      website: "https://humantraffickinghotline.org"
    }
  ];

  const handleWebsitePress = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Emergency Resources</Text>
      
      {resources.map((resource, index) => (
        <View key={index}>
          <View style={styles.resourceContainer}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceNumber}>{resource.number}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
            
            <TouchableOpacity 
              style={styles.websiteButton}
              onPress={() => handleWebsitePress(resource.website)}
            >
              <View style={{flexDirection:'row'}}>
                 <Text style={styles.websiteText}>Visit Website</Text>
                <Feather name="external-link" size={15} /></View>
            </TouchableOpacity>
          </View>
          
          {index < resources.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
      
      <View style={styles.divider} />
         <View>
            <SafetyTips/>
         </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:width*0.01
  },
  header: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: textColor.color3,
    marginBottom: height * 0.02,
  },
  resourceContainer: {
    backgroundColor:'#fff',
    borderRadius:10,
    height:height*0.25,
    justifyContent:'center',
    paddingHorizontal:10
  },
  resourceTitle: {
    fontSize: width * 0.048,
    fontWeight: '600',
    color: textColor.color3,
    marginBottom: height * 0.005,
  },
  resourceNumber: {
    fontSize: width * 0.04,
    color: '#1a571f',
    marginBottom: height * 0.005,
  },
  resourceDescription: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: height * 0.01,
    lineHeight: height * 0.025,
  },
  websiteButton: {
    alignSelf: 'flex-start',
    marginTop: height * 0.005,
  },
  websiteText: {
    fontSize: width * 0.035,
    color: textColor.color3,
    fontWeight: '500',
    marginRight:4
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: height * 0.01,
  },
  safetyTipsContainer: {
    marginTop: height * 0.01,
  },
  
});

export default ResourceScreen;