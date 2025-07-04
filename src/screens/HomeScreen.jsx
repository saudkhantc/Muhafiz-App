import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Dimensions,
    Modal,
    Alert,
    Image,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SafetyFeaturesSreen from './TobTabScreen/SafetyFeaturesSreen';
import ResourceScreen from './TobTabScreen/ResourceScreen';
import NearbyFacilityScreen from './TobTabScreen/NearbyFacilityScreen';
import { textColor } from '../styles/Styles';
import TopTabSelector from '../navigation/TopTabSelector';
import CustomHeader from '../components/CustomHeader';
import Logo from '../assets/images/Logo.png';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const [activeTab, setActiveTab] = useState('Safety Features');
    const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [countdownActive, setCountdownActive] = useState(false);

    // const handleEmergencyPress = () => {
    //     if (!countdownActive) {
    //         setShowEmergencyAlert(true);
    //         setCountdown(5);
    //         setCountdownActive(true);

    //         const timer = setInterval(() => {
    //             setCountdown(prev => {
    //                 if (prev <= 1) {
    //                     clearInterval(timer);
    //                     setCountdownActive(false);

    //                     const emergencyMessage = 'This is an emergency! Please help me. I am in danger and need assistance immediately.';
    //                     const phoneNumber = '1234567890'; 

    //                     Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(emergencyMessage)}`);

    //                     setShowEmergencyAlert(false);
    //                     return 0;
    //                 }
    //                 return prev - 1;
    //             });
    //         }, 1000);
    //     } else {
    //         setCountdownActive(false);
    //         setShowEmergencyAlert(false);
    //         Alert.alert('Emergency Cancelled', 'The alert has been cancelled');
    //     }
    // };
const handleEmergencyPress = () => {
    if (!countdownActive) {
        setShowEmergencyAlert(true);
        setCountdown(5);
        setCountdownActive(true);

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCountdownActive(false);

                    const swabiLat = 34.1242173;
                    const swabiLng = 72.4922671;
                    const mapsUrl = `https://www.google.com/maps?q=${swabiLat},${swabiLng}`;

                    const emergencyMessage = `🚨 Emergency Alert!\nI am in danger and need assistance.\nHere is my location: ${mapsUrl}`;
                    const emergencyNumber = '911'; 

                    Linking.openURL(`sms:${emergencyNumber}?body=${encodeURIComponent(emergencyMessage)}`);

                    setShowEmergencyAlert(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    } else {
        setCountdownActive(false);
        setShowEmergencyAlert(false);
        Alert.alert('Emergency Cancelled', 'The alert has been cancelled');
    }
};

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#f8f0ff" barStyle="dark-content" />

            {/* Header */}
            <CustomHeader />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image source={Logo} style={styles.profileIconContainer} />

                    <Text style={styles.welcomeText}>Welcome to Muhafiz</Text>
                    <Text style={styles.subtitleText}>
                        Your personal safety companion. Access emergency features, manage
                        trusted contacts, and find safety resources all in one place.
                    </Text>
                </View>

                {/* Emergency SOS Section */}
                <View style={styles.emergencySosContainer}>
                    <Text style={styles.emergencySosTitle}>Emergency SOS</Text>

                    <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyPress}>
                        <Text style={styles.emergencyButtonText}>EMERGENCY SOS</Text>
                    </TouchableOpacity>

                    <Text style={styles.emergencyDescription}>
                        Press the button in case of emergency. This will alert your trusted
                        contacts.
                    </Text>
                </View>

                {/* Emergency Modal */}
                <Modal visible={showEmergencyAlert} transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.alertBox}>
                            <Text style={styles.alertTitle}>Emergency SOS</Text>

                            <View style={styles.alertDivider} />

                            <Text style={styles.alertText}>
                                <Text style={styles.boldText}>Emergency Mode Activated!</Text>
                                {"\n"}Alert will be sent in {countdown} seconds. Tap the button again to cancel.
                            </Text>

                            <View style={styles.alertDivider} />

                            <TouchableOpacity style={styles.cancelButton} onPress={handleEmergencyPress}>
                                <Text style={styles.cancelButtonText}>CANCEL EMERGENCY</Text>
                            </TouchableOpacity>

                            <Text style={styles.alertFooterText}>
                                Press the button in case of emergency. This will alert your trusted contacts.
                            </Text>
                        </View>
                    </View>
                </Modal>

                {/* Call Emergency Services */}
                <TouchableOpacity style={styles.callServiceButton} onPress={() => Linking.openURL('tel:911')}>
                    <Icon name="phone" size={16} />
                    <Text style={styles.callServiceText}>Call Emergency Services</Text>
                </TouchableOpacity>

                {/* Top Tabs */}
                <TopTabSelector
                    tabs={['Safety Features', 'Resource', 'Nearby Facilities']}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
                <View style={{ marginTop: height * 0.02 }}>
                    {activeTab === 'Safety Features' && <SafetyFeaturesSreen />}
                    {activeTab === 'Resource' && <ResourceScreen />}
                    {activeTab === 'Nearby Facilities' && <NearbyFacilityScreen />}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f0ff',
    },
    scrollView: {
        paddingHorizontal: width * 0.04,
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: height * 0.02,
    },
    profileIconContainer: {
        width: width * 0.25,
        height: width * 0.25,
        marginBottom: height * 0.008,
    },
    profileInitial: {
        color: '#fff',
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#6200ea',
        marginBottom: height * 0.005,
    },
    subtitleText: {
        fontSize: width * 0.035,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: width * 0.05,
    },
    emergencySosContainer: {
        backgroundColor: '#fff',
        padding: width * 0.05,
        borderRadius: width * 0.03,
        marginVertical: height * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    emergencySosTitle: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#d4007a',
        marginBottom: height * 0.015,
        textAlign: 'center',
    },
    emergencyButton: {
        backgroundColor: '#ff2d75',
        paddingVertical: height * 0.017,
        borderRadius: width * 0.06,
        alignItems: 'center',
        marginBottom: height * 0.01,
    },
    emergencyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: width * 0.035,
    },
    emergencyDescription: {
        textAlign: 'center',
        fontSize: width * 0.03,
        color: '#888',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    alertBox: {
        width: width * 0.85,
        backgroundColor: 'white',
        borderRadius: width * 0.04,
        padding: width * 0.05,
    },
    alertTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#d4007a',
        textAlign: 'center',
        marginBottom: height * 0.01,
    },
    alertDivider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: height * 0.015,
    },
    alertText: {
        fontSize: width * 0.04,
        color: '#333',
        textAlign: 'center',
        marginBottom: height * 0.015,
        lineHeight: height * 0.025,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#ff2d75',
    },
    cancelButton: {
        backgroundColor: '#ff2d75',
        paddingVertical: height * 0.015,
        borderRadius: width * 0.02,
        alignItems: 'center',
        marginVertical: height * 0.01,
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: width * 0.035,
    },
    alertFooterText: {
        fontSize: width * 0.03,
        color: '#888',
        textAlign: 'center',
        marginTop: height * 0.01,
    },
    callServiceButton: {
        backgroundColor: '#fff',
        paddingVertical: height * 0.015,
        borderRadius: width * 0.02,
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: height * 0.015,
        flexDirection:'row',
        justifyContent:'center'
    },
    callServiceText: {
        fontSize: width * 0.035,
        color: textColor.color3,
        marginLeft:6
    },
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