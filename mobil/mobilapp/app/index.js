import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Login from './Login';
import Category from './Category';
import Product from './Product';
import Stock from './Stock';
import Register from './Register';

const Stack = createNativeStackNavigator();
const App = () => {
 
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={Login}
          />
          
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Category"
          component={Category}
        />
        <Stack.Screen
          name="Product"
          component={Product}
        />
        <Stack.Screen
          name="Stock"
          component={Stock}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
