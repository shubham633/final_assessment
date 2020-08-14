import { observable, action, computed } from 'mobx';
import { getAllUsers } from '../database/RealmHandler';


class Login {
  @observable userDetails = [];

  @action getAllUsers = () => {
    getAllUsers().then((res) => {
      this.userDetails = res;
    }).catch((error) => {
      console.log(error);
    });
  };

  @computed get _usersDetails() {
    return this.usersDetails;
  }
}
export default Login;
