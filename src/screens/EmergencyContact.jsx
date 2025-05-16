// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   TextInput,
//   Modal,
//   SafeAreaView
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { textColor } from '../styles/Styles';
// import CustomHeader from '../components/CustomHeader';

// const { width, height } = Dimensions.get('window');

// const EmergencyContacts = () => {
//   const [contacts, setContacts] = useState([
//     { id: '1', name: 'Emergency Services', number: '911' },
//     { id: '2', name: 'Mom', number: '555-123-4567' },
//     { id: '3', name: 'Sister', number: '555-765-4321' }
//   ]);



//   return (
//     <SafeAreaView style={styles.container}>
//         <View>
//             <CustomHeader/>
//         </View>

//     <ScrollView style={styles.scrollcontainer}>

//       <Text style={styles.header}>Emergency Contacts</Text>
//       <Text style={styles.subtitle}>
//         Manage the trusted contacts who will receive alerts in case of emergency.
//       </Text>

//       <View style={styles.headerRow}>
//         <Text style={[styles.header,{fontSize:16}]}>Emergency Contacts</Text>
//         <TouchableOpacity style={styles.addContactButton} >
//           <Text style={styles.addContactText}>+ Add Contact</Text>
//         </TouchableOpacity>
//       </View>

//       {contacts.map(contact => (
//         <View key={contact.id} style={styles.contactCard}>
//           <View style={styles.contactInfo}>
//             <FontAwesome name="user-circle" size={35} color={textColor.color3} />
//            <View style={{marginHorizontal:10}}>
//              <Text style={styles.contactName}>{contact.name}</Text>
//             <View style={styles.phoneContainer}>
//               <Icon name="phone" size={width * 0.05} color={textColor.color3} />
//               <Text style={styles.contactNumber}>{contact.number}</Text>
//             </View>
//            </View>
//           </View>
//           <TouchableOpacity style={styles.deleteButton}>
//             <Icon name="delete" size={width * 0.05} color="#ff4444" />
//           </TouchableOpacity>
//         </View>
//       ))}

//     </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollcontainer:{
//      flexGrow:1,
//      padding: width * 0.05,
//   },
//   header: {
//     fontSize: width * 0.05,
//     fontWeight: 'bold',
//     color: textColor.color3,
//     marginBottom: height * 0.015,
//   },
//   subtitle: {
//     fontSize: width * 0.035,
//     color: '#666',
//     marginBottom: height * 0.025,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: height * 0.02,
//   },
//   sectionTitle: {
//     fontSize: width * 0.045,
//     fontWeight: '600',
//     color: '#000',
//   },
//   addContactButton: {
//     borderWidth: 1,
//     borderColor: '#1a571f',
//     borderRadius: 6,
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//   },


//   addContactText: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#1a571f',
//   },
//   contactCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#f8f0ff',
//     borderRadius: width * 0.03,
//     padding: width * 0.04,
//     marginBottom: height * 0.015,
//   },
//   contactInfo: {
//     flex: 1,
//     flexDirection:'row'
//   },
//   contactName: {
//     fontSize: width * 0.04,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: height * 0.005,
//   },
//   phoneContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   contactNumber: {
//     fontSize: width * 0.035,
//     color: '#666',
//     marginLeft: width * 0.02,
//   },
//   deleteButton: {
//     padding: width * 0.02,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: width * 0.85,
//     backgroundColor: '#fff',
//     borderRadius: width * 0.04,
//     padding: width * 0.05,
//   },
//   modalTitle: {
//     fontSize: width * 0.05,
//     fontWeight: 'bold',
//     color: '#6200ea',
//     marginBottom: height * 0.03,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: width * 0.02,
//     padding: width * 0.04,
//     marginBottom: height * 0.02,
//     fontSize: width * 0.04,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: height * 0.015,
//     borderRadius: width * 0.02,
//     alignItems: 'center',
//   },
//   cancelButton: {
//     backgroundColor: '#f0f0f0',
//     marginRight: width * 0.02,
//   },
//   saveButton: {
//     backgroundColor: '#6200ea',
//     marginLeft: width * 0.02,
//   },
//   cancelButtonText: {
//     color: '#666',
//     fontSize: width * 0.04,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: width * 0.04,
//   },
// });

// export default EmergencyContacts;

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Modal,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { textColor } from '../styles/Styles';
import CustomHeader from '../components/CustomHeader';

const { width, height } = Dimensions.get('window');

const EmergencyContacts = () => {
    const [contacts, setContacts] = useState([
        { id: '1', name: 'Emergency Services', number: '911' },
        { id: '2', name: 'Mom', number: '555-123-4567' },
        { id: '3', name: 'Sister', number: '555-765-4321' }
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newContactName, setNewContactName] = useState('');
    const [newContactNumber, setNewContactNumber] = useState('');


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <CustomHeader />
            </View>

            <ScrollView style={styles.scrollcontainer}>

                <Text style={styles.header}>Emergency Contacts</Text>
                <Text style={styles.subtitle}>
                    Manage the trusted contacts who will receive alerts in case of emergency.
                </Text>

                <View style={styles.headerRow}>
                    <Text style={[styles.header, { fontSize: 16 }]}>Emergency Contacts</Text>
                    <TouchableOpacity style={styles.addContactButton} onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.addContactText}>+ Add Contact</Text>
                    </TouchableOpacity>
                </View>

                {contacts.map(contact => (
                    <View key={contact.id} style={styles.contactCard}>
                        <View style={styles.contactInfo}>
                            <FontAwesome name="user-circle" size={35} color={textColor.color3} />
                            <View style={{ marginHorizontal: 10 }}>
                                <Text style={styles.contactName}>{contact.name}</Text>
                                <View style={styles.phoneContainer}>
                                    <Icon name="phone" size={width * 0.05} color={textColor.color3} />
                                    <Text style={styles.contactNumber}>{contact.number}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Icon name="delete" size={width * 0.05} color="#ff4444" />
                        </TouchableOpacity>
                    </View>
                ))}

                <Modal
                    transparent
                    visible={isModalVisible}
                    animationType="slide"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>

                            {/* Close Icon */}
                            <TouchableOpacity
                                style={styles.modalCloseIcon}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Icon name="close" size={24} color="#333" />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Add New Contact</Text>
                            <TextInput
                                placeholder="Name"
                                value={newContactName}
                                onChangeText={setNewContactName}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                                value={newContactNumber}
                                onChangeText={setNewContactNumber}
                                style={styles.input}
                            />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => {
                                        setIsModalVisible(false);
                                        setNewContactName('');
                                        setNewContactNumber('');
                                    }}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.modalButton, styles.saveButton]}
                                    onPress={() => {
                                        if (newContactName && newContactNumber) {
                                            const newContact = {
                                                id: (contacts.length + 1).toString(),
                                                name: newContactName,
                                                number: newContactNumber
                                            };
                                            setContacts([...contacts, newContact]);
                                            setIsModalVisible(false);
                                            setNewContactName('');
                                            setNewContactNumber('');
                                        }
                                    }}
                                >
                                    <Text style={styles.saveButtonText}>Save</Text>
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
    sectionTitle: {
        fontSize: width * 0.045,
        fontWeight: '600',
        color: '#000',
    },
    addContactButton: {
        borderWidth: 1,
        borderColor: '#1a571f',
        borderRadius: 6,
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
     modalCloseIcon:{
       alignSelf:'flex-end'
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
        flexDirection: 'row'
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
