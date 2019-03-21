import React from 'react';

import {
    Image,
    Text,
    Button,
    View,
    StyleSheet
} from 'react-native';

import { Icon } from 'expo';
import Colors from '../../../constants/Colors';
import CommonHelpers from '../../../components/CommonHelpers';
import URLs from '../../../constants/URLs';

export default class UserProfileTopSection extends React.Component {
    constructor(props) {
        super(props);
    }

    getImageUrl(id) {
        return URLs.images + id;
    }

    render() {
        return (
            <View style={{ width: '90%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.name}</Text>
                <View style={styles.profileHeader}>
                    <Image source={{ uri: this.getImageUrl(this.props.id) }}
                        style={styles.profileImage} />
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: "#555" }}>{this.props.username}</Text>
                        <Text>{this.props.email}</Text>
                        <Text>{this.props.website}</Text>
                        <Text>{this.props.company.name}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: "center", marginTop: 10 }}>
                            <Icon.Ionicons name={CommonHelpers.getIonIconName("call")} size={18} style={{paddingRight: 3}}/>
                            <Button color={Colors.primaryColor} onPress={() => { }} title="Call Now"></Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    profileHeader: {
        width: '100%',
        elevation: 1,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',  // main axis
        justifyContent: 'flex-start', // main axis
        alignItems: 'center', // cross axis
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 2,
        paddingRight: 20,
        marginTop: 0,
        marginBottom: 12
    },
    profileImage: {
        backgroundColor: '#ccc',
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 8
    }
});
