import React, { useRef ,useEffect} from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'; 

const ScansScreen = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;
  const colorValue = useRef(new Animated.Value(0)).current;
  const tickScale = useRef(new Animated.Value(1)).current;


  useEffect(() => {
    startWelcomeAnimation();
  }, []);

  const startWelcomeAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.05,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTickPress = () => {
    Animated.sequence([
      Animated.timing(tickScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(tickScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  
 

  const interpolatedColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4CAF50', '#FFC107'], // Green to Amber
  });

 

    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleTickPress}>
            <Animated.View style={{ transform: [{ scale: tickScale }] }}>
              <FontAwesome name="check" size={30} color="green" />
            </Animated.View>
          </TouchableOpacity>
    
          <Text style={styles.welcomeText}>Welcome back, John</Text>
    
          <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }], opacity: fadeValue }]}>
            <Text style={styles.welcomeText}>John</Text>
            <Text style={styles.balanceText}>Actual balance:</Text>
            <Text style={styles.balanceText2}>10 fidizz</Text>
          </Animated.View>
    
          <Text style={styles.tapToWinText}>Scan your phone on the shop tab win fidizz</Text>
        </View>
      );
    };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 180,
    backgroundColor: '#007bff', // Green color (change as needed)
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  nfcLogo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius:25,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scanMessage: {
    fontSize: 16,
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 16,
  },
  tapToWinText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff', // Blue color
  },
  tickCircle: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25, // Half of width and height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  tickText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
 
  balanceText2: {
    fontSize: 36,                
    fontWeight: '600',           
    color: '#333333',            
    marginTop: 15,              
    marginBottom: 15,          
    textAlign: 'center',          
    letterSpacing: 1,        
    fontFamily: 'Arial',         
  },
});

export default ScansScreen;
