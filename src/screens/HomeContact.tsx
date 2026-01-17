

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import Contacts, { Contact } from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Heading from '../components/heading';
import SearchBar from '../components/searchbar';
import Card from '../components/Card';
import { requestContactsPermission } from '../utils/permission';
import Notdata from '../components/notdata';
import { hp, wp } from '../utils/responsive';
import { sortContactsSmart } from '../utils/contactsorting';
import { useFocusEffect } from '@react-navigation/native';

const HomeContact = () => {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [filteredContacts, setFilteredContacts] = React.useState<Contact[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [favorites, setFavorites] = React.useState<Contact[]>([]);
  const FAVORITE_KEY = 'FAVORITE_CONTACTS';

  const onRefresh = async () => {
    setSearchText('');
    setRefreshing(true);
    await getContacts(true);
    setRefreshing(false);
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.trim() === '') {
        setFilteredContacts(contacts);
      } else {
        const lowerText = searchText.toLowerCase();

        const filtered = contacts.filter(contact =>
          contact.displayName?.toLowerCase().includes(lowerText) ||
          contact.phoneNumbers?.[0]?.number?.includes(searchText)
        );

        setFilteredContacts(filtered);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText, contacts]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.log('Error loading favorites', e);
    }
  };

  const getContacts = async (isrefresh: boolean) => {
    // console.warn('Fetching contacts...');
    const permission = await requestContactsPermission();
    if (!permission) return;
    isrefresh ? null : setLoading(true);
    const data = await Contacts.getAll();

    // const sorted = data.sort((a, b) => {
    //   if (a.displayName > b.displayName) return 1;
    //   if (a.displayName < b.displayName) return -1;
    //   return 0;
    // });

    const sorted = sortContactsSmart(data);
    setContacts(sorted);
    setFilteredContacts(sorted);
    setLoading(false);
  };
  React.useEffect(() => {
    getContacts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const addtofav = async (item: Contact) => {
    // console.log("1111111111111111111", item)

    try {

      const stored = await AsyncStorage.getItem(FAVORITE_KEY);
      let favs: Contact[] = stored ? JSON.parse(stored) : [];

      const exists = favs.some(fav => fav.recordID === item.recordID);
      //  console.log("fav 1111111111111",exists)
      if (exists) {
        //remove
        favs = favs.filter(fav => fav.recordID !== item.recordID);
      } else {
        //add
        favs.push(item);
      }

      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favs));
      setFavorites(favs); 
      // console.log('Favorite contacts updated',favs);
    } catch (e) {
      console.log('Error saving favorite', e);
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.recordID === id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5EFEA', padding: wp(4) }}>
      <Heading props={"Contacts"} />
      <SearchBar value={searchText}
        onChangeText={setSearchText}
        placeholder="Search contacts" />
      <Text style={styles.subHeading}>My Contact</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={25} color={"black"} />
          <Text style={{ fontSize: 16 }}>Loading contacts...</Text>
        </View>
      ) : null}

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.recordID}
        refreshing={refreshing}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        onRefresh={onRefresh}
        ListEmptyComponent={loading ? null : <Notdata props={"No Data Found"} />}

        contentContainerStyle={{ paddingVertical: hp(1) }}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPressFavorite={addtofav}
            isFavorite={isFavorite(item.recordID)}
          />
        )}
      />

    </View>
  );
};

export default HomeContact;

const styles = StyleSheet.create({
  subHeading: {
    marginVertical: hp(1), fontFamily: 'MonaSans-Medium'
  }
  , loadingContainer: {
    flexDirection: 'column', alignItems: 'center', gap: hp(2)
  }
});