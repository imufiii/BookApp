import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { BookProvider, BookDetail } from './src/components/BookDetails';
import BooksList from './src/components/BookList';
import Borrowed from './src/components/BorrowedBooks';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Book List" component={BooksList} />
    <Stack.Screen name="Book Details" component={BookDetail} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <BookProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let iconColor = focused ? '#ff6347' : '#4682b4';

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Borrowed') {
                iconName = 'book';
              }

              return <MaterialIcons name={iconName as any} size={size} color={iconColor} />;
            },
            tabBarActiveTintColor: '#ff6347',
            tabBarInactiveTintColor: '#4682b4',
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Borrowed" component={Borrowed} />
        </Tab.Navigator>
      </NavigationContainer>
    </BookProvider>
  );
}
