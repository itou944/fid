import React, { useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,ScrollView } from 'react-native';
import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';



const ChatScreen = ({ route }) => {
  const { userId, userName } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Assistant',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  }, []);

  // Modified handleOrder function to send order as a message
  const handleOrder = async (item) => {
    const orderMessage = {
      _id: Math.random().toString(36).substring(7),
      text: `I would like to order a ${item.title}, please.`,
      createdAt: new Date(),
      user: {
        _id: userId,
        name: userName,
      },
    };
  
    // Send message to Firestore
    try {
      await addDoc(collection(db, "orders"), orderMessage);
      console.log("Order sent to Firestore");
      onSend([orderMessage]);
    } catch (error) {
      console.error("Error sending order to Firestore: ", error);
    }
  };
  

  // Dummy Data for Quick Actions
  const quickActions = [
    { id: 1, title: 'Check Balance', icon: 'wallet' },
    { id: 2, title: 'Recent Transactions', icon: 'receipt' },
    { id: 3, title: 'Help & Support', icon: 'question-circle' },
  ];

  const menuItems = [
    { id: 1, title: 'Coffee', icon: 'coffee', price: '$2.99', image: 'https://example.com/coffee.jpg' },
    { id: 2, title: 'Tea', icon: 'leaf', price: '$1.99', image: 'https://example.com/tea.jpg' },
    { id: 3, title: 'Juice', icon: 'glass-martini', price: '$3.50', image: 'https://example.com/juice.jpg' },
    { id: 4, title: 'Hamburger', icon: 'hamburger', price: '$4.99', image: 'https://example.com/hamburger.jpg' },
    { id: 5, title: 'Salad', icon: 'seedling', price: '$3.99', image: 'https://example.com/salad.jpg' },
    { id: 6, title: 'Pasta', icon: 'utensils', price: '$5.50', image: 'https://example.com/pasta.jpg' },
    { id: 7, title: 'Pizza', icon: 'pizza-slice', price: '$6.99', image: 'https://example.com/pizza.jpg' },
    { id: 8, title: 'Sushi', icon: 'fish', price: '$8.50', image: 'https://example.com/sushi.jpg' },
  ];


  // Dummy Function to simulate sending data to Firebase
  const handleQuickAction = (action) => {
    console.log(`Action Selected: ${action.title}`);
    // Here you would send data to Firebase or perform the action
  };

  const renderMenuItems = () => (
    <ScrollView horizontal style={styles.menuContainer}>
      {menuItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleOrder(item)}>
          <FontAwesome5 name={item.icon} size={24} color="#007bff" />
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          <Text style={styles.menuItemPrice}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Customizing the Send Button
  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <FontAwesome5 name="paper-plane" size={20} color="#007bff" />
      </View>
    </Send>
  );

  // Customizing the chat bubble
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#007bff',
        },
      }}
    />
  );

  // Render Quick Actions Menu
  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      {quickActions.map((action) => (
        <TouchableOpacity key={action.id} style={styles.quickAction} onPress={() => handleQuickAction(action)}>
          <FontAwesome5 name={action.icon} size={24} color="#007bff" />
          <Text style={styles.quickActionText}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {renderQuickActions()}
      {renderMenuItems()}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userId, name: userName }}
        renderSend={renderSend}
        renderBubble={renderBubble}
        alwaysShowSend
      />

    </View>
  );
};

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#e8e8e8',
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionText: {
    marginTop: 5,
    color: '#007bff',
  },

  menuContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    width: 120,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  menuItemTitle: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#007bff',
  },
  menuItemPrice: {
    color: '#555',
  },
});

export default ChatScreen;
