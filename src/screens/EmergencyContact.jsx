import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { textColor } from '../styles/Styles';
import CustomHeader from '../components/CustomHeader';
import api from '../services.js/Api';

const { width, height } = Dimensions.get('window');

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) fetchContacts();
  }, [userId]);

  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserId(user._id);
      }
    } catch (error) {
      console.error('Failed to retrieve user ID:', error);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/contacts/${userId}`);
      setContacts(response.data);
    } catch (error) {
     // Alert.alert('Error', 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async () => {             // added contact
    if (!newContactName.trim() || !newContactNumber.trim()) {
      Alert.alert('Validation', 'Please enter both name and number');
      return;
    }

    setSaving(true);
    try {
      const contact = {
        contactName: newContactName,
        contactNumber: newContactNumber,
        userId: userId,
      };

      const response = await api.post('/contacts', contact);


      setContacts((prev) => [...prev, response.data]);
      setIsModalVisible(false);
      setNewContactName('');
      setNewContactNumber('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add contact');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteContact = (id) => {                 // deleted contact
    Alert.alert('Delete Contact', 'Are you sure you want to delete this contact?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/contacts/${id}`);
            setContacts((prev) => prev.filter((c) => c._id !== id));
          } catch (error) {
            Alert.alert('Error', 'Failed to delete contact');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6200ea" style={{ marginTop: 20 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <ScrollView style={styles.scrollcontainer}>
        <Text style={styles.header}>Emergency Contacts</Text>
        <Text style={styles.subtitle}>
          Manage trusted contacts who will receive alerts in case of emergency.
        </Text>

        <View style={styles.headerRow}>
          <Text style={[styles.header, { fontSize: 16 }]}>Emergency Contacts</Text>
          <TouchableOpacity style={styles.addContactButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.addContactText}>+ Add Contact</Text>
          </TouchableOpacity>
        </View>

        {contacts.map((contact) => (
          <View key={contact._id} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <FontAwesome name="user-circle" size={35} color={textColor.color3} />
              <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.contactName}>{contact.contactName}</Text>
                <View style={styles.phoneContainer}>
                  <Icon name="phone" size={width * 0.05} color={textColor.color3} />
                  <Text style={styles.contactNumber}>{contact.contactNumber}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteContact(contact._id)}>
              <Icon name="delete" size={width * 0.05} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}

        <Modal transparent visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalCloseIcon} onPress={() => setIsModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Add New Contact</Text>
              <TextInput placeholder="Name" value={newContactName} onChangeText={setNewContactName} style={styles.input} editable={!saving} />
              <TextInput placeholder="Phone Number" keyboardType="phone-pad" value={newContactNumber} onChangeText={setNewContactNumber} style={styles.input} editable={!saving} />

              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => {
                  setIsModalVisible(false);
                  setNewContactName('');
                  setNewContactNumber('');
                }} disabled={saving}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleAddContact} disabled={saving}>
                  <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollcontainer: {
    flexGrow: 1,
    padding: width * 0.05,
  },
  header: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: textColor.color3,
    marginBottom: height * 0.015,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: height * 0.025,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  addContactButton: {
    borderWidth: 1,
    borderColor: '#1a571f',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  modalCloseIcon: {
    alignSelf: 'flex-end',
  },
  addContactText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a571f',
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f0ff',
    borderRadius: width * 0.03,
    padding: width * 0.04,
    marginBottom: height * 0.015,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  contactName: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#333',
    marginBottom: height * 0.005,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactNumber: {
    fontSize: width * 0.035,
    color: '#666',
    marginLeft: width * 0.02,
  },
  deleteButton: {
    padding: width * 0.02,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: width * 0.04,
    padding: width * 0.05,
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: height * 0.015,
    borderRadius: width * 0.02,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: width * 0.02,
  },
  saveButton: {
    backgroundColor: '#6200ea',
    marginLeft: width * 0.02,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: width * 0.04,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
});

export default EmergencyContacts;
