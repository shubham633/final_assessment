import React from "react";
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";

export default class Productdetails extends React.Component {
constructor(props) {
super(props);
  this.state = {
  loading: true,
  dataSource:[] };
}

componentDidMount(){
fetch('https://preprod.vestigebestdeals.com/api/rest/productdetails', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "product_id":2963,
      "customer_id":96,  
      "wcode":"DWK,HWH,S71" 
  }),
}).then(response => response.json())
.then((responseData)=> {
	console.log(responseData.data);
this.setState(
{
  dataSource: responseData.data,
  loading: false
})
})
.catch(error=>console.log(error))
}


FlatListItemSeparator = () => {
return (
<View style={{
  height: .5,
  width:"100%",
  backgroundColor:"rgba(0,0,0,0.5)",}}/>
  );
}

// renderItem = (data) => {
//         return (
//            <TouchableOpacity >
//                 <Text>{data.item.name}</Text>
//                 </TouchableOpacity>
//         );
//     }

render()
{

return(
  <View>
      <FlatList       
          data={ this.state.dataSource }
          renderItem={({item}) =><Text>{item.price}</Text>}
          keyExtractor={(item, index) => index}          
      />
  </View>
         );
       }
     }

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#0c9"
},
loader:{
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff"
},
list:{
  paddingVertical: 2,
  margin: 5,
  backgroundColor: "#fff"
}
});