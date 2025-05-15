import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { textColor } from '../styles/Styles';

const { width, height } = Dimensions.get('window');

const TopTabSelector = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={styles.tabRow}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabButton, activeTab === tab && styles.activeTab]}
          onPress={() => onTabChange(tab)}
        >
          <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TopTabSelector;

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: width * 0.025,
    overflow: 'hidden',
    marginTop: height * 0.02,
  },
  tabButton: {
    flex: 1,
    paddingVertical: height * 0.015,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: width * 0.025,
  },
  tabText: {
    fontSize: width * 0.032,
    color: '#666',
  },
  activeTabText: {
    fontSize: width * 0.03,
    color: textColor.color3,
    fontWeight: 'bold',
  },
});
