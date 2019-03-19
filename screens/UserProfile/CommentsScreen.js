import React from 'react';

import {
    Text,
    FlatList,
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

import { HeaderBackButton } from 'react-navigation';
import Colors from '../../constants/Colors';
import URLs from '../../constants/URLs';

export default class CommentsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Comments',
            headerLeft: <HeaderBackButton
                title="Back" tintColor={Colors.primaryColor}
                onPress={() => navigation.goBack(null)} />
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            postInfo: this.props.navigation.state.params.post
        };
    }

    componentDidMount() {
        return fetch(this.getCommentsUrl(this.state.postInfo.id))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    commentsDatasource: responseJson,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getCommentsUrl(postId) {
        return URLs.comments.replace('{postId}', postId);
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
                data={this.state.commentsDatasource}
                renderItem={this.renderCommentsItem}
            />
        </View>)
    }

    renderCommentsItem = ({ item }) => (

        <View style={{
            backgroundColor: "#fff", marginLeft: 10,
            marginRight: 10, marginBottom: 10, marginTop: 10, padding: 10,
            borderRadius: 5, shadowOffset: { width: 2, height: 2, },
            shadowColor: '#aaa',
            shadowOpacity: 0.3
        }}>
            <Text style={styles.postTitle}>{item.name}</Text>
            <Text style={{ color: Colors.primaryColor, opacity: 0.8 }}>{item.email}</Text>
            <Text>{item.body}</Text>

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

