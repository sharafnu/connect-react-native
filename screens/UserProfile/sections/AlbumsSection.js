import React from 'react';

import {
    FlatList,
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import PhotosSection from './PhotosSection';
import URLs from '../../../constants/URLs';

export default class AlbumsSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        return fetch(this.getAlbumsUrl(this.props.id))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    albumsDatasource: responseJson,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getAlbumsUrl(userId) {
        return URLs.albums + userId;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (<View style={{ backgroundColor: "#fafafa", paddingTop: 10, width: '100%' }}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.albumsDatasource}
                renderItem={this.renderAlbumItem}
            />
        </View>)
    }

    renderAlbumItem = ({ item }) => (

        <View style={{
            marginLeft: 10,
            marginRight: 10, marginBottom: 10, marginTop: 10, padding: 10
        }}>
            <PhotosSection {...item}></PhotosSection>

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

