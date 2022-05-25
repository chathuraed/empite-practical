import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import WeatherScreen from '../features/WeatherScreen';
import RestaurentsScreen from '../features/RestaurentsScreen';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={WeatherScreen} />
      <Tab.Screen name="Restaurents" component={RestaurentsScreen} />
    </Tab.Navigator>
  );
};

export default AppTab;
