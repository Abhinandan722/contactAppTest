import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeContact from '../screens/HomeContact';
import Favorite from '../screens/favorite';
import { Fontisto } from '@react-native-vector-icons/fontisto';
import AntDesign from '@react-native-vector-icons/ant-design';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { Lucide } from '@react-native-vector-icons/lucide';

const BottomTabScreen = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{
            animation:"shift",
            headerShown: false,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: '#777',
        }}>
            <Tab.Screen name='HomeContact' component={HomeContact}
                options={{
                    tabBarIcon: ({ color,focused }) => {
                        return <Lucide name="contact-round" color={color} size={focused?21:20} />
                    },
                    tabBarLabel: "Contacts",
                    tabBarLabelStyle:{
fontFamily: 'MonaSans-Medium'                   }

                }} />
            <Tab.Screen name='FavoriteContact' component={Favorite}
                options={{
                    tabBarIcon: ({ color ,focused}) => {
                        return <FontAwesome name="heart-o" color={color} size={focused?21:20} />
                    }, tabBarLabel: "Favorite",
                    tabBarLabelStyle:{
                    fontFamily: 'MonaSans-Medium'}
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabScreen

const styles = StyleSheet.create({})