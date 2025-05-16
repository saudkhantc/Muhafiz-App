import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { textColor } from '../../styles/Styles';

const { width, height } = Dimensions.get('window');

const SafetyTips = () => {
  const [expandedTips, setExpandedTips] = useState({});

  const tips = [
    {
      id: 1,
      question: "What should I do if I feel unsafe while walking alone?",
      answer: "Stay in well-lit areas, walk confidently, keep your phone charged, share your location with trusted contacts, and consider carrying a personal alarm."
    },
    {
      id: 2,
      question: "How can I create a safety plan?",
      answer:'Identify safe areas in your neighborhood, memorize emergency contacts, prepare an emergency bag, establish code words with trusted friends/family, and know the location of nearby police stations and hospitals.'
    //   bullets: [
    //     "What should I do during an emergency?",
    //     "How can I help a friend who feels unsafe?"
    //   ]
    },
    {
        id:3,
        question:'What should I do during an emergency?',
        answer:'Stay calm, call emergency services if possible, use this apps SOS feature to alert your contacts, try to move to a public area, and be clear and concise when communicating your situation.'
    },
    {
        id:4,
        question:'How can I help a friend who feels unsafe?',
        answer:'Listen without judgment, offer to accompany them, help them create a safety plan, know the resources available in your area, and encourage them to seek professional help if needed.'
    }
  ];

  const toggleTip = (id) => {
    setExpandedTips(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <View style={styles.safetyTipsContainer}>
      <Text style={styles.sectionTitle}>Safety Tips</Text>
      {tips.map((tip) => (
        <View key={tip.id} style={styles.tipContainer}>
          <TouchableOpacity 
            style={styles.tipHeader}
            onPress={() => toggleTip(tip.id)}
          >
            <AntDesign name="questioncircleo" size={15} color={"#1a571f"}/>
            <Text style={styles.tipQuestion}>{tip.question}</Text>
            <Icon 
              name={expandedTips[tip.id] ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
              size={width * 0.06} 
              color="#6200ea" 
            />
          </TouchableOpacity>
          
          {expandedTips[tip.id] && (
            <View style={styles.tipContent}>
                
              {tip.answer ? (
                <Text style={styles.tipAnswer}>{tip.answer}</Text>
              ) : (
                <View style={styles.bulletContainer}>
                  {tip.bullets?.map((bullet, i) => (
                    <View key={i} style={styles.bulletItem}>
                      
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  safetyTipsContainer: {
    marginTop: height * 0.01,
  },
  sectionTitle: {
     fontSize: width * 0.05,
    fontWeight: 'bold',
    color: textColor.color3,
    marginBottom: height * 0.02,
  },
  tipContainer: {
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: width * 0.02,
    overflow: 'hidden',
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.03,
    backgroundColor: '#fff',
  },
  tipQuestion: {
    fontSize: width * 0.038,
    fontWeight: '500',
    color: '#333',
    flex: 1,
   alignSelf:'flex-end',
   marginLeft:4
  },
  tipContent: {
    padding: width * 0.03,
    backgroundColor: '#fff',
  },
  tipAnswer: {
    fontSize: width * 0.035,
    color: '#666',
    lineHeight: height * 0.025,
  },
  bulletContainer: {
    marginLeft: width * 0.02,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: height * 0.01,
  },
  bullet: {
    fontSize: width * 0.035,
    color: '#666',
    marginRight: width * 0.015,
  },
  bulletText: {
    fontSize: width * 0.035,
    color: '#666',
    flex: 1,
  },
});

export default SafetyTips;