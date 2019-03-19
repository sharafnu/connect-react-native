import React from 'react';

import {
    Text,
    FlatList,
    View,
    ActivityIndicator,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import URLs from '../../../constants/URLs';

var { width, height } = Dimensions.get("window");

export default class PhotosSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        return fetch(this.getPhotosUrl(this.props.id))
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    photosDatasource: responseJson,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getPhotosUrl(albumId) {
        return URLs.photos + albumId;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View>
                <Text style={{ fontWeight: "bold", color: "#444", marginBottom: 4 }}>{this.props.title}</Text>

                <FlatList horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    style={{ flexDirection: 'row', flexWrap: 'nowrap' }}
                    keyExtractor={this.keyExtractor}
                    data={this.state.photosDatasource}
                    renderItem={this.renderPhotoItem}
                />
            </View>)
    }

    renderPhotoItem = ({ item, index }) => (

        <View style={[
            { width: (width) / 3.5, height: (width / 3.5) },
            { paddingLeft: 4 }
        ]}>
            <Image style={{ flex: 1, width: undefined, height: undefined, borderRadius: 5, backgroundColor: "#ccc" }} source={{ uri: item.url }} />
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

