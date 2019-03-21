import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

import { MapView } from 'expo';

var { height } = Dimensions.get("window");

export default class AddressDetailsSection extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{ backgroundColor: "#aaa", height: (height)/2, width: '100%' }}>        
                <MapView
                    style={{ height: '100%' }}
                    initialRegion={{
                        //latitude: parseInt(this.props.address.geo.lat),
                        //longitude: parseInt(this.props.address.geo.lng),
                        //Hardcoding the location for demo purposes. The above values shows map in no man's land :)
                        latitude: 22.672827,
                        longitude: 113.990868,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    provider="google"
                />



                <View style={styles.addressContainer } >
                    <Text style={styles.addressLabel}>Street</Text>
                    <Text style={styles.addressInfo}>{this.props.address.street}</Text>
                    <Text style={styles.addressLabel}>Suite</Text>
                    <Text style={styles.addressInfo}>{this.props.address.suite}</Text>
                    <Text style={styles.addressLabel}>City</Text>
                    <Text style={styles.addressInfo}>{this.props.address.city}</Text>
                    <Text style={styles.addressLabel}>Zip Code</Text>
                    <Text style={styles.addressInfo}>{this.props.address.zipcode}</Text>
                </View>
            </View>        
        )
    }

}

const styles = StyleSheet.create({
    addressContainer: {
        margin: 20, 
        backgroundColor: "#fff", 
        padding: 10, 
        width: '90%',
        height: 'auto',
        alignSelf: "center",
        borderRadius: 10,
        position: "absolute",
        marginTop: 50,
        borderColor: "white",
        borderWidth: 2,
        zIndex: 5,
        shadowOffset: { width: 2, height: 2, },
        shadowColor: '#aaa',
        shadowOpacity: 0.3
    },
    addressLabel: {
        color: "#888",
        marginTop: 5
    },
    addressInfo: {
        fontWeight: "bold"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});