import {UserSchema} from './Schema';
import {Alert} from 'react-native';

const Realm = require('realm');

export const addUser = async (userDetails) => new Promise((resolve, reject) => {
  Realm.open({ schema: [UserSchema] })
    .then(realm => {
      realm.write(() => {
        realm.create('signup', userDetails);
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });;
});

export const getAllUsers = async () => new Promise((resolve, reject) => {
  Realm.open({ schema: [UserSchema] })
    .then(realm => {
      let allUsers = realm.objects('signup');
      resolve(allUsers);
      console.log('getuser'+allUsers);
    })
    .catch(error => {
      reject(error);
    });;
});

