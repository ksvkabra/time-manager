import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/HomeScreen';
import PomodoroTimer from './components/PomodoroTimer';
import Counter from './components/Counter';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Timer' component={PomodoroTimer} />
        <Stack.Screen name='Counter' component={Counter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
