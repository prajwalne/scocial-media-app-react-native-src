import React, {useEffect} from 'react';

import 'react-native-gesture-handler';
import {useDispatch, connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import AddPost from './screens/AddPost';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import UserProfile from './screens/UserProfile';
import Search from './screens/Search';
import SearchProfile from './screens/SearchProfile';
import UserList from './screens/UserList';
import Chats from './screens/Chats';
import Messages from './screens/Messages';

import {SET_USER, IS_AUTHENTICATED} from './action/action.types';

import EmptyContainer from './components/EmptyContainer';
import {requestPermission} from './utils/AskPermission';
import CustomHeader from './layout/CustomHeader';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();




const myTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={true}
      barStyle={{
      backgroundColor: 'black',
        // #1b1b1b
        // borderColor: 'white',
        // borderWidth: 1,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={searchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="message-text"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const searchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchProfile" component={SearchProfile} />
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="Chats" component={Chats} />
    </Stack.Navigator>
  );
};

const App = ({authState}) => {
  const dispatch = useDispatch();
  changeNavigationBarColor('black');
  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });
      console.log('user id', user._user.uid);

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', (snapshot) => {
          console.log('USER DETAILS', snapshot.val());
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };
  useEffect(() => {
  
    requestPermission();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (authState.loading) {
    return <EmptyContainer />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{header: (props) => <CustomHeader {...props} />}}>
        {authState.isAuthenticated ? (
          <>
            <Stack.Screen name="test" component={myTab} />
            {/* <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddPost" component={AddPost} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SearchProfile" component={SearchProfile} />
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name="Chats" component={Chats} /> */}
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = (state) => ({authState: state.auth});

export default connect(mapStateToProps)(App);
