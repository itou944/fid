import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const ScansScreen = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startWelcomeAnimation();
  }, []);

  const startWelcomeAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }),
    ]).start(() => {
      // Automatically start the tap to win animation after the welcome animation
      startTapToWinAnimation();
    });
  };

  const startTapToWinAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.3,
          duration: 3000,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();
  };

  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back, John</Text>
     
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }], opacity: fadeValue }]}>
        
        <Text style={styles.balanceText}>Actual balance: 10 fidizz</Text>
      </Animated.View>
      <Text style={styles.tapToWinText}>Tap to win fidizz</Text>
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
    backgroundColor: '#C0C0C0', // Silver color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default ScansScreen;
