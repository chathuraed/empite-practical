import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import WeatherScreen from './src/features/WeatherScreen';
import RestaurentsScreen from './src/features/RestaurentsScreen';
import SigninScreen from './src/features/Auth/SigninScreen';
import InitialPoint from './src/InitialPoint';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={WeatherScreen} />
      <Tab.Screen name="Restaurents" component={RestaurentsScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen
          name="Initial"
          component={InitialPoint}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={SigninScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Root" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
