import React from 'react';

import {
    Text,
    FlatList,
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

import { Icon } from 'expo';
import CommonHelpers from '../../../components/CommonHelpers';
import URLs from '../../../constants/URLs';

export default class TODOListSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        return fetch(this.getTodoListUrl(this.props.id))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    todoListDatasource: responseJson,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    getTodoListUrl(userId) {
        return URLs.todos + userId;
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
                data={this.state.todoListDatasource}
                renderItem={this.renderTodoItem}
            />
        </View>)
    }

    renderTodoItem = ({ item }) => (

        <View style={{
            flexDirection: 'row',
            marginRight: 10, marginBottom: 5, marginTop: 10, padding: 10,
            borderRadius: 5, backgroundColor: "#fff", shadowOffset: { width: 2, height: 2, },
            shadowColor: '#aaa',
            shadowOpacity: 0.3
        }}>
            <Icon.Ionicons

                name={item.completed ?
                    CommonHelpers.getIonIconName("checkmark-circle") :
                    CommonHelpers.getIonIconName("radio-button-off")}
                size={26}
                style={{ marginBottom: -3, marginRight: 8 }}
                color={item.completed ? '#ffcce0' : '#444'}
            />

            <Text style={[{ paddingRight: 10 }, item.completed ? { color: '#aaa' } : { color: '#333' }]}>{item.title}</Text>


        </View>
    )

    keyExtractor = (item, index) => index.toString();
}

const styles = StyleSheet.create({
});

