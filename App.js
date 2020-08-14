import 'react-native-gesture-handler';
import React,{Component} from 'react';
import Router from './src/navigation/Nav';
import { Provider } from 'mobx-react';
import store from './src/store/Store';

export default class App extends Component {
  render() {
    return (
      <Provider {...store}>
      <Router/>
      </Provider>);
  }
}