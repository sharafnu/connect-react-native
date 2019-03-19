import React from 'react';

import {
    Text,
    FlatList,
    View,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Colors from '../../../constants/Colors';
import { Icon } from 'expo';
import CommonHelpers from '../../../components/CommonHelpers';
import URLs from '../../../constants/URLs';

export default class PostsSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        return fetch(this.getPostsUrl(this.props.id))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    postsDatasource: responseJson,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getPostsUrl(userId) {
        return URLs.posts + userId;
    }

    navigateToComments(post) {
        this.props.navigation.navigate('Comments', { post });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (<View style={{ backgroundColor: "#f1f1f1", paddingTop: 10 }}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.postsDatasource}
                renderItem={this.renderPostItem}
            />
        </View>)
    }

    renderPostItem = ({ item }) => (

        <View style={{
            backgroundColor: "#fff", marginLeft: 10,
            marginRight: 10, marginBottom: 10, marginTop: 10, padding: 14,
            borderRadius: 5, shadowOffset: { width: 2, height: 2, },
            shadowColor: '#aaa',
            shadowOpacity: 0.3
        }}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.body}</Text>

            <View
                style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Icon.Ionicons
                        name={CommonHelpers.getIonIconName("heart")}
                        size={16}
                        style={{ marginRight: 5 }}
                        color={Colors.primaryColor}
                    />
                    <Text style={{ color: "#444" }}>153</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: 'row', flexWrap: 'nowrap', marginLeft: 20 }}
                    onPress={() => this.navigateToComments(item) }>
                    <Icon.Ionicons
                        name={CommonHelpers.getIonIconName("text")}
                        size={16}
                        style={{ marginRight: 5 }}
                        color="#777"
                    />
                    <Text style={{ color: "#444" }}>Comments</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    keyExtractor = (item, index) => index.toString();
}

const styles = StyleSheet.create({

    postTitle: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: "#444"
    }
});

