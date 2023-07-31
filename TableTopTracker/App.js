import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from './screens/Landing.js'
import SignUp from './screens/SignUp.js'
import Login from './screens/Login.js'
import Home from './screens/Home.js'
import NewUserPreferences from './screens/NewUserPreferences.js'
import AccountDetails from './screens/AccountDetails.js'


import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import theme from './theme';

// alex: gameslist components / dummy data
import GamesList from './components/GameList/GamesList';
import Recommendations from './components/Recommendation/Recommendations';
import MyGames from './components/GameList/MyGames';
import ButtonList from './components/GameList/ButtonList';
import allDummyGames from './components/GameList/dummy/allDummyGames';
import recommendedDummyGames from './components/Recommendation/recommendedDummyGames';
import personalDummyGames from './components/GameList/dummy/personalDummyGames';

const Stack = createNativeStackNavigator();

//yarn add firebase, yarn add @react-native-firebase/auth
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCm5h0zCb155nFsvZifi1tXdh8ekZYhpKI",
  authDomain: "tabletoptracker-d603c.firebaseapp.com",
  projectId: "tabletoptracker-d603c",
  storageBucket: "tabletoptracker-d603c.appspot.com",
  messagingSenderId: "477015804806",
  appId: "1:477015804806:web:f13f69fbadd2210b777a07",
  measurementId: "G-M20LEKC85Y"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



export default function App() {

  // alex: some states & stuff
  const listTypes = [ 'All', 'My Games', 'Recommendations', 'Liked', 'Wishlist' ];
  // TODO: implement ability to add custom lists

  const [ selectedList, setSelectedList ] = React.useState(listTypes[0]);

  return (
    <PaperProvider theme={ theme }>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{title: 'TableTop Tracker'}}
        />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Account Details" component={AccountDetails} />
        <Stack.Screen name="New User Preferences" component={NewUserPreferences} />

        </Stack.Navigator>
      </NavigationContainer>

      {/* GamesList stuff */}
      <View style={ styles.gameListContent }>
        <ButtonList
          listTypes={ listTypes }
          selectedList={ selectedList }
          setSelectedList={ setSelectedList }
        />
        <GamesList
          games={ allDummyGames }
          selectedList={ selectedList }
        />
        {/* <Recommendations games={ recommendedDummyGames } /> */}
        {/* <MyGames games={ personalDummyGames } /> */}
      </View>
    </PaperProvider>
  );
}

// AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameListContent: {
    flex: 1, // takes 70% of available space
    marginTop: 10
  },
});