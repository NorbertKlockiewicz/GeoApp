import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './components/Main'
import List from './components/List'
import Map from './components/Map'

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="main"
            component={Main}
            options={{
              title: 'GeoMap App',
              headerStyle: {
                backgroundColor: 'rgb(90,200,250)',
                height: 350
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: "center",
                fontSize: 50,
              },
            }} />
          <Stack.Screen
            name="list"
            component={List}
            options={{
              title: 'Zapis Pozycji',
              headerStyle: {
                backgroundColor: 'rgb(90,200,250)',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
              },
            }} />
          <Stack.Screen
            name="map"
            component={Map}
            options={{
              title: 'Lokalizacja na mapie',
              headerStyle: {
                backgroundColor: 'rgb(90,200,250)',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
              },
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
