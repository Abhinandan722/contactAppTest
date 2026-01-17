import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { Contact } from 'react-native-contacts';
import { hp, wp } from '../utils/responsive';

interface ContactItemProps {
  item: Contact;
  onPressFavorite: (item: Contact) => void;
  isFavorite: boolean;
}

const Card: React.FC<ContactItemProps> = ({ item, onPressFavorite, isFavorite }) => {
     const email = item.emailAddresses?.[0]?.email || '';
      const scaleAnim = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  // console.log("thisnisiiiiii---",item.thumbnailPath)
  return (
 <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      {/* Avatar */}
{
  item.thumbnailPath?
  <Image
  source={{ uri: item.thumbnailPath }}
  style={{ width: wp(12), height: wp(12), borderRadius: wp(6), marginRight: wp(3) }}
/>
  : <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.displayName?.charAt(0)}</Text>
      </View>
}
      
      {/* <Image
  source={
    item.hasThumbnail
      ? { uri: 
"content://com.android.contacts/display_photo/10" }
      : 
  } */}
  {/* style={{ width: 50, height: 50, borderRadius: 25 }}
/> */}

      {/* Info */}
      <View style={styles.info}>
            <Text style={styles.name}>{item.displayName}</Text>
        <Text style={styles.phone}>{item.phoneNumbers?.[0]?.number || 'No number'}</Text>
        {
            email?
             <Text style={styles.email}>{email}</Text>: null
        }
       

        
      </View>

      {/* Favorite Heart */}
      <TouchableOpacity onPress={() => onPressFavorite(item)}>
        <FontAwesome
          name={isFavorite ? 'heart' : 'heart-o'}
          size={20}
          color={isFavorite ? '#E53935' : '#999'}
        />
      </TouchableOpacity>
  </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: hp(1.6),
    marginVertical: hp(0.8),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    // elevation: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatar: {
    height: wp(12),
    width: wp(12),
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#111827',
    fontFamily: 'MonaSans-Medium'
  },
  phone: {
    marginTop: hp(0.3),
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'MonaSans-Regular'
  },
    email: {
    marginTop: hp(0.3),
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  
});