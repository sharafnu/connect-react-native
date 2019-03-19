import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/Home/HomeScreen';
import UserProfileScreen from '../screens/UserProfile/UserProfileScreen';
import CommentsScreen from '../screens/UserProfile/CommentsScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Profile: {
    screen: UserProfileScreen
  },
  Comments: {
    screen: CommentsScreen
  }
});

export default createAppContainer(AppNavigator);