import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

class HttpExample extends Component {
   constructor(props) {
super(props);
this.state = {
dataSource:[] };
}
   componentDidMount = () => {
      fetch('https://preprod.vestigebestdeals.com/api/rest/dynamickittingproductlistwithfiltersortwarehouse', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify( {
   "category_id":13,  
   "filter": "", 
  "page_num":1,
  "sort":"",
  "customer_id":96,  
  "wcode":"DWK,HWH,S71" 
}
),
}).then(response => response.json())
.then((responseData)=> {
  console.log(responseData.data);
this.setState(
{
dataSource: responseData.data,
})
})
.catch(error=>console.log(error))

   }
   render() {
      return (
         <View>
           <FlatList
       
          data={ this.state.dataSource }

          renderItem={({item}) =><Text>{item.consistency_order_amount}</Text>}

          keyExtractor={(item, index) => index}
          
         />
         </View>
      )
   }
}
export default HttpExample