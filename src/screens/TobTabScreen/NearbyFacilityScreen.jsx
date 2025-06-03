import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert,
    Share
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { textColor } from '../../styles/Styles'; 

const { width, height } = Dimensions.get('window');

const NearbyFacilityScreen = () => {
    const [activeTab, setActiveTab] = useState('Hospitals');

    const swabiLocation = {
        latitude: 34.1242173,
        longitude: 72.4922671,
    };

    const updateLocation = () => {
        Alert.alert('Static Location', 'Swabi location is being used.');
    };

    const facilitiesData = {
        Hospitals: [
            {
                id: 'h1',
                name: 'City General Hospital',
                distance: '0.7 miles',
                address: '123 Medical Ave',
            },
            {
                id: 'h2',
                name: 'Community Health Center',
                distance: '1.2 miles',
                address: '456 Care Street',
            },
            {
                id: 'h3',
                name: 'Emergency Medical Center',
                distance: '1.9 miles',
                address: '789 Urgent Road',
            }
        ],
        Pharmacies: [
            {
                id: 'p1',
                name: 'Medical Pharmacy',
                distance: '0.3 miles',
                address: '101 Drug Lane',
            },
            {
                id: 'p2',
                name: 'Quick Relief DrugStore',
                distance: '0.8 miles',
                address: '202 Medicine Blvd',
            }
        ]
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.header}>Nearby Medical Facilities</Text>
                {/* <TouchableOpacity style={styles.locationbuttoon} onPress={updateLocation}>
                    <Icon name="location-on" size={15} color={'#1a571f'} />
                    <Text style={styles.locationtext}>Use Swabi Location</Text>
                </TouchableOpacity> */}
            </View>

           

            <View style={styles.tabRow}>
                {['Hospitals', 'Pharmacies'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tabButton,
                            activeTab === tab && styles.activeTab
                        ]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <View style={styles.tabContent}>
                            <Icon
                                name={tab === 'Hospitals' ? 'local-hospital' : 'local-pharmacy'}
                                size={16}
                                color={activeTab === tab ? textColor.color3 : '#666'}
                                style={{ marginRight: 6 }}
                            />
                            <Text style={[
                                styles.tabText,
                                activeTab === tab && styles.activeTabText
                            ]}>
                                {tab}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.facilitiesContainer}>
                {facilitiesData[activeTab].map(facility => (
                    <View key={facility.id} style={styles.facilityCard}>
                        <View style={styles.facilityHeader}>
                            <View style={styles.facilityIconAndName}>
                                <Icon
                                    name={activeTab === 'Hospitals' ? 'local-hospital' : 'local-pharmacy'}
                                    size={20}
                                    color={activeTab === 'Hospitals' ? '#6200ea' : '#1a571f'}
                                    style={{ marginRight: 1 }}
                                />
                                <Text style={styles.facilityName}>{facility.name}</Text>
                            </View>
                            <Text style={styles.distance}>{facility.distance}</Text>
                        </View>

                        <Text style={styles.address}>{facility.address}</Text>

                        <TouchableOpacity
                            style={styles.shareButton}
                            onPress={() => {
                                const message = `Here's the location of Swabi: https://www.google.com/maps?q=${swabiLocation.latitude},${swabiLocation.longitude}`;
                                Share.share({ message });
                            }}
                        >
                            <Icon name="share" size={width * 0.05} color="#6200ea" />
                            <Text style={styles.shareText}>Share Location</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: textColor.color3,
        marginBottom: height * 0.03,
    },
    locationbuttoon: {
        height: 30,
        borderWidth: 1,
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: '#1a571f'
    },
    locationtext: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1a571f'
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabRow: {
        flexDirection: 'row',
        backgroundColor: '#6661',
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
        fontWeight: '700'
    },
    activeTabText: {
        fontSize: width * 0.03,
        color: textColor.color3,
        fontWeight: 'bold',
    },
    facilitiesContainer: {
        marginBottom: height * 0.02,
    },
    facilityIconAndName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: width * 0.01,
    },
    facilityCard: {
        backgroundColor: '#fff',
        borderRadius: width * 0.03,
        marginBottom: height * 0.01,
        height: height * 0.2,
        marginTop: 10
    },
    facilityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height * 0.01,
        backgroundColor: '#6663',
        height: height * 0.07,
    },
    facilityName: {
        fontSize: width * 0.035,
        fontWeight: '700',
        color: textColor.color3,
        marginLeft: width * 0.02,
    },
    distance: {
        fontSize: width * 0.035,
        color: '#666',
        marginRight: 10
    },
    address: {
        fontSize: width * 0.035,
        color: '#666',
        marginBottom: height * 0.015,
        marginHorizontal: 10
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 20,
        marginRight: 10
    },
    shareText: {
        fontSize: width * 0.035,
        color: '#6200ea',
        marginLeft: width * 0.02,
    },
});

export default NearbyFacilityScreen;
