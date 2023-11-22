// ChatScreen.js
import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = ({ route }) => {
  const { userId, userName } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return <GiftedChat messages={messages} onSend={onSend} user={{ _id: userId, name: userName }} />;
};

export default ChatScreen;
