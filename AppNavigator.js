import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons';
import ConversationListScreen from './ConversationListScreen';
import ChatsScreen from './ChatsScreen';
import ScansScreen from './ScansScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ConversationStack = () => (
  <Stack.Navigator initialRouteName="ConversationList">
    <Stack.Screen name="ConversationList" component={ConversationListScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Explore') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          } else if (route.name === 'Scans') {
            iconName = focused ? 'ios-barcode' : 'ios-barcode-outline';
          } else if (route.name === 'chats') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Explore" component={ConversationStack} />
      <Tab.Screen name="Scans" component={ScansScreen} />
      <Tab.Screen name="chats" component={ChatsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
