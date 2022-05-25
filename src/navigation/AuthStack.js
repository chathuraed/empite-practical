import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SigninScreen from '../features/Auth/SigninScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SigninScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
