import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { hp, wp } from '../utils/responsive';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')} // replace with your logo path
        style={styles.logo}
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
    backgroundColor: '#FFFFFF', // white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp(30),  // 40% of screen width
    height:wp(30), // keep it square
    marginBottom: hp(1),
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000', // black text
    fontFamily: 'MonaSans-Bold', // optional custom font
  },
});