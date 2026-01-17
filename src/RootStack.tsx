import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabScreen from './tabs/BottomTabScreen'
import SplashScreen from './components/splashscreen'

const RootStack = () => {
  const Stack = createNativeStackNavigator()
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {

      setIsLoading(false);
    }, 1000); // 1 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" ,contentStyle:{
    
    } }} >
      {
        isLoading ? (
          <Stack.Screen name="splash" component={SplashScreen} />
        ) :
         <Stack.Screen name='BottomTabScreen' component={BottomTabScreen} />
      }

    </Stack.Navigator>
  )
}

export default RootStack

const styles = StyleSheet.create({})