
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from 'react-native-contacts';

import Heading from '../components/heading';
import SearchBar from '../components/searchbar';
import Card from '../components/Card';
import Notdata from '../components/notdata';
import { hp, wp } from '../utils/responsive';
import { sortContactsSmart } from '../utils/contactsorting';
import { useFocusEffect } from '@react-navigation/native';

const FAVORITE_KEY = 'FAVORITE_CONTACTS';

const Favorite = () => {
  const [favorites, setFavorites] = React.useState<Contact[]>([]);
  const [filteredFavorites, setFilteredFavorites] = React.useState<Contact[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadFavorites = async (iscome:boolean) => {
    try {
      iscome?null: setLoading(true);
      const stored = await AsyncStorage.getItem(FAVORITE_KEY);
      const data: Contact[] = stored ? JSON.parse(stored) : [];
      const sorted = sortContactsSmart(data);
      setFavorites(sorted);
      setFilteredFavorites(sorted);
    } catch (e) {
      console.log('Error loading favorites', e);
    } finally {
      setLoading(false);
    }
  };

useFocusEffect(
  useCallback(() => {
    loadFavorites(true);
  }, [])
);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchText.trim()) {
        setFilteredFavorites(favorites);
      } else {
        const lower = searchText.toLowerCase();
        const filtered = favorites.filter(
          c =>
            c.displayName?.toLowerCase().includes(lower) ||
            c.phoneNumbers?.[0]?.number?.includes(searchText)
        );
        setFilteredFavorites(filtered);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText, favorites]);

  
  const toggleFavorite = async (item: Contact) => {
    try {
      const updated = favorites.filter(f => f.recordID !== item.recordID);
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(updated));
      setFavorites(updated);
      setFilteredFavorites(updated);
    } catch (e) {
      console.log('Error removing favorite', e);
    }
  };

  const isFavorite = (id: string) =>
    favorites.some(f => f.recordID === id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };
console.log("Filtered Favorites:", filteredFavorites);
  return (
    <View style={{ flex: 1, backgroundColor: '#F5EFEA', padding: wp(4) }}>
      <Heading props="Favorites" />
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search favorites"
      />
<Text style={styles.subHeading}>My Favorite</Text>
  
      <FlatList
        data={filteredFavorites}
        keyExtractor={item => item.recordID}
        refreshing={refreshing}
        onRefresh={onRefresh}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        ListEmptyComponent={
         <Notdata props={"No Data Found"}/>
        }
        contentContainerStyle={{ paddingVertical: hp(1) }}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPressFavorite={toggleFavorite}
            isFavorite={isFavorite(item.recordID)}
          />
        )}
      />
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  
   subHeading: {
    marginVertical:hp(1), fontFamily: 'MonaSans-Medium'
  }
});