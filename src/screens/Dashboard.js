import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('dashboard')
@observer
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log('hi');
    this.props.dashboard.fetchData();
  }
  
  render() {
    const { productData, fetchData } = this.props.dashboard;
    return (
      <View>
        <FlatList
          keyExtractor={item=>item.id.toString()}
          data={productData}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatListContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.textView}>{item.name}</Text>
                </View>
              </View>
            )
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#53b3c3'
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#53b3c3'

  },
  heading: {
    fontSize: 35,
    marginTop: 10,
    color: '#ffffff',
    marginBottom: 10,
    marginLeft: 50,
  },
  userName: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column',
    width: '70%'
  },
  itemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  imageView: {
    width: '30%',
    height: 150,
    margin: 7,
    borderRadius: 50
  },
  textView: {
    fontSize: 18,
    padding: 5,
    color: '#fff'
  },
  btn: {
    marginLeft: '75%',
    width: '25%',
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'flex-end'
  },
  btnTxt: {
    fontSize: 20,
    color: "#ffffff"
  },
});
export default Dashboard;