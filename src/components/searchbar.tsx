import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
 // or your icon lib
import { Fontisto } from '@react-native-vector-icons/fontisto';
import { hp, wp } from '../utils/responsive';
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = "Search..." }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
   
       <Fontisto name="search" size={20} color="#666" />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: wp(3),
    // height: 45,
   minHeight: hp(5.5),
    borderWidth: 1,
    borderColor: '#DDD',

  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
   
  },
});