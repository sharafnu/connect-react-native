import React from 'react';

import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import { HeaderBackButton } from 'react-navigation';

import CustomButton from '../../components/CustomButton';
import UserProfileTopSection from './sections/UserProfileTopSection';
import PostsSection from './sections/PostsSection';
import AlbumsSection from './sections/AlbumsSection';
import TODOListSection from './sections/TODOListSection';
import AddressDetailsSection from './sections/AddressDetailsSection';
import Colors from '../../constants/Colors';

export default class UserProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'User Profile',
            headerLeft: <HeaderBackButton 
                title="Home" tintColor={Colors.primaryColor}
                onPress={() => navigation.goBack(null)} />
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            activeSegment: 0,
            userInfo: this.props.navigation.state.params.userInfo
        };
    }

    changeSegment(index) {
        this.state.activeSegment = index;
        this.setState({ activeSegment: index });
        this.renderSegment();
    }

    renderSegment = () => {
        switch (this.state.activeSegment) {
            case 0: {

                return (
                    <View style={styles.segmentContainer}>
                        <PostsSection {...this.state.userInfo} navigation={this.props.navigation}></PostsSection>
                    </View>
                )
            }
            case 1: {
                return (
                    <View style={styles.segmentContainer}>
                        <AlbumsSection {...this.state.userInfo}></AlbumsSection>
                    </View>
                )
            }
            case 2: {
                return (
                    <View style={styles.segmentContainer}>
                        <TODOListSection {...this.state.userInfo}></TODOListSection>
                    </View>
                )
            }
            case 3: {
                return (
                    <View style={styles.segmentContainer}>
                        <AddressDetailsSection {...this.state.userInfo}></AddressDetailsSection>
                    </View>
                )
            }
        }
    }

    render() {

        return (
            <ScrollView contentContainerStyle={styles.userProfileContainer}>
                <UserProfileTopSection {...this.props.navigation.state.params.userInfo}></UserProfileTopSection>

                <View style={{ borderTopWidth: 1, borderTopColor: '#eee' }}>
                    <View style={styles.segmentButtonContainer}>
                        <CustomButton title="Posts" icon="clipboard"
                            activeSegment={this.state.activeSegment}
                            index="0"
                            onPress={() => { this.changeSegment(0) }}>
                        </CustomButton>
                        <CustomButton title="Albums" icon="images"
                            activeSegment={this.state.activeSegment}
                            index="1"
                            onPress={() => { this.changeSegment(1) }}>
                        </CustomButton>
                        <CustomButton title="TODO" icon="list"
                            index="2"
                            activeSegment={this.state.activeSegment}
                            onPress={() => { this.changeSegment(2) }}>
                        </CustomButton>
                        <CustomButton title="Address" icon="pin"
                            index="3"
                            activeSegment={this.state.activeSegment}
                            onPress={() => { this.changeSegment(3) }}>
                        </CustomButton>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    {this.renderSegment()}
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    segmentButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        marginLeft: 10
    },
    userProfileContainer: {
        marginBottom: 10,
        alignItems: "center",
        paddingTop: 10
    },
    segmentContainer: {
        flexDirection: 'row', flexWrap: 'wrap',
    }
});