import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import UserDetail from '../screens/UserDetail';
import UserList from '../screens/UserList';
import {RootStackParamList} from '../types/interfaces';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;
