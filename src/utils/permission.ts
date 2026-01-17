import { PermissionsAndroid, Platform } from 'react-native';

export const requestContactsPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts Permission',
        message: 'This app needs access to your contacts',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.log('Permission error:', error);
    return false;
  }
};