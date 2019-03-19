import React from 'react';
import { Icon } from 'expo';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  View,
  TouchableOpacity
} from 'react-native';
import CommonHelpers from '../../components/CommonHelpers';
import Colors from '../../constants/Colors';
import URLs from '../../constants/URLs';


export default class HomeScreen extends React.Component {


  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch(URLs.users)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  keyExtractor = (item, index) => index.toString()


  renderUserListItem = ({ item }) => (
    <TouchableOpacity style={styles.listRow}
      onPress={() => this.props.navigation.navigate('Profile', { userInfo: item })}>
      <Image source={{ uri: URLs.images + item.id }}
        style={styles.profileImage} />
      <View>
        <Text style={styles.profileName}>{item.name}</Text>
        <Text style={{ color: "#444", opacity: 0.8 }}>{item.username}</Text>
      </View>
      <View style={styles.moreIcon}>
        <Icon.Ionicons
          name={CommonHelpers.getIonIconName("arrow-forward")}
          size={26}
          style={{ marginBottom: -3, opacity: 0.5 }}
          color={Colors.primaryColor}
        />
      </View>
    </TouchableOpacity>

  )

  render() {

    this.navigation = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.boldLabel}>Home</Text>
        <View style={styles.container}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.dataSource}
            renderItem={this.renderUserListItem}
          />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    marginBottom: 10,
    alignItems: "flex-start",
    padding: 20,
    paddingTop: 100,
    backgroundColor: '#eee'
  },
  boldLabel: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 30,
  },
  container: {
    flex: 1,
    paddingTop: 22,
    width: '100%'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  listRow: {
    width: '100%',
    elevation: 1,
    borderRadius: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginTop: 0,
    marginBottom: 12,
    shadowOffset: { width: 2, height: 2, },
    shadowColor: '#aaa',
    shadowOpacity: 0.3
  },
  profileImage: {
    backgroundColor: '#ccc',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 8
  },
  profileName: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  moreIcon: {
    flex: 1, flexDirection: 'row', justifyContent: 'flex-end'
  }
});

