import {  action } from 'mobx';
import { addUser } from '../database/RealmHandler';

class AddUser {

  @action addUser = (userDetails) => {
    addUser(userDetails);
  };

}

export default AddUser;
