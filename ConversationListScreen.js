import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';

const ConversationListScreen = ({ navigation }) => {
  const dummyCityList = ['Paris', 'New York', 'London', 'Tokyo']; // Dummy city list

  const [selectedCity, setSelectedCity] = useState(dummyCityList[0]); // Default: Paris
  const [cityFilter, setCityFilter] = useState(''); // State for city filtering

  // Dummy conversation data (replace with your data)
  const conversations = [
    { id: '1', name: 'John Doe', lastMessage: 'Hello there!', businessName: 'The perfect restaurant', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG', city: 'Paris', businesstype: "restaurant" },
    { id: '2', name: 'Jane Smith', lastMessage: 'How are you?', businessName: 'Business B', imageUrl: null, city: 'New York', businesstype: "museum" },
    {
        id: '3',
        name: 'Alex Martin',
        lastMessage: 'Any updates?',
        businessName: 'Cafe de Paris',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG', // Image of Paris at night
        city: 'Paris',
        businessType: 'cafe',
        
      },
      {
        id: '4',
        name: 'Lucy Dupont',
        lastMessage: 'Thank you!',
        businessName: 'Paris Boutique',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG', // Image of Eiffel Tower view
        city: 'Paris',
        businessType: 'retail',
        
      },

      {
        id: '5',
        name: 'Maxime Lefevre',
        lastMessage: 'Looking forward to our collaboration.',
        businessName: 'Lefevre Art Gallery',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG', // Image of Eiffel Tower and surroundings
        city: 'Paris',
        businessType: 'art gallery',
      }
  ];

  const filteredConversations = conversations.filter(conversation =>
    conversation.city.toLowerCase() === selectedCity.toLowerCase() &&
    conversation.businessName.toLowerCase().includes(cityFilter.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', { userId: item.id, userName: item.name })}
      style={styles.itemContainer}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.profileImage}
        />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>{item.businessName}</Text>
        <Text>{item.lastMessage}</Text>
        <Text style={styles.cityText}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.cityListContainer}>
        {dummyCityList.map(city => (
          <TouchableOpacity
            key={city}
            style={[styles.cityButton, selectedCity === city && styles.selectedCityButton]}
            onPress={() => setSelectedCity(city)}
          >
            <Text>{city}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by business name..."
        onChangeText={setCityFilter}
        value={cityFilter}
      />
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10, // Assuming the profile photo should be a circle
    marginRight: 16,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 10, // Assuming the profile photo should be a circle
    marginRight: 16,
    backgroundColor: '#ccc', // Placeholder color
  },
  textContainer: {
    flex: 1,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cityText: {
    color: '#555',
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cityListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
  cityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedCityButton: {
    backgroundColor: '#007bff',
  },
});

export default ConversationListScreen;
