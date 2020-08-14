import { observable, action, computed } from 'mobx';

class Dashboard {
   
    @observable productData =[];
    @observable pageNO = 1;

    @action fetchData = () => {
        fetch('https://preprod.vestigebestdeals.com/api/rest/productdetails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "product_id": 2963,
        "customer_id": 96,
        "wcode": "DWK,HWH,S71"
      }),
    }).then(response => response.json())
      .then((responseData) => {
       this.productData=responseData.data;   
      })
      .catch(error => console.log(error))
    };
    @computed get _productData() {
        return this.productData;
    }
}
export default Dashboard;