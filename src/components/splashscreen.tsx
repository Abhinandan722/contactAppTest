import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { hp, wp } from '../utils/responsive';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';


const SplashScreen = () => {
  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0);

useEffect(() => {
    scale.value = withTiming(1, {
      duration: 700,
    });
    opacity.value = withTiming(1, {
      duration: 500,
    });
  }, []);
      const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
  return (
    <View style={styles.container}>
        
      
          <Animated.Image
        source={require('../../assets/images/logo.png')}
        style={[styles.logo, imageStyle]}
        resizeMode="contain"
      />
        
      <Text style={styles.appName}>Contact App</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp(30),  
    height:wp(30), 
    marginBottom: hp(1),
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000', 
    fontFamily: 'MonaSans-Bold', 
  },
});