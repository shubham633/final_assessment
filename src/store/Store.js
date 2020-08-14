import AddUser from './AddUser';
import Login from './Login';
import Dashboard from './Dashboard';


class Store {
  dashboard: Dash;
  signupUser: AddUser;
  loginUser: Login;
  

  constructor() {
    this.signupUser = new AddUser(this);  
    this.loginUser = new Login(this);
    this.dashboard = new Dashboard(this);   
  }
}
export default new Store();