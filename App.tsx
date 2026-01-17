import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import RootStack from './src/RootStack';
import { Text } from '@react-navigation/elements';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      
      <NavigationContainer>
      <RootStack />
     
    </NavigationContainer>
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
