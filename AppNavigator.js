import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ConversationListScreen from './ConversationListScreen';
import ChatsScreen from './ChatsScreen';
import ScansScreen from './ScansScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ConversationStack = () => (
  <Stack.Navigator initialRouteName="ConversationList">
    <Stack.Screen name="ConversationList" component={ConversationListScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ConversationStack} />
      <Tab.Screen name="Scans" component={ScansScreen} />
      <Tab.Screen name="chats" component={ScansScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;