import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { AppRegistry, StyleSheet, ActivityIndicator,
  ListView, Dimensions, View, Alert,Image, Platform, Linking, TouchableOpacity} from 'react-native';

import {Thumbnail, Container, Content, Left, Right, Text, Body, Card, CardItem, Button} from 'native-base';

const cluster = require('./../cluster.json');
class Mainproject extends Component{

 constructor(props) {
   super(props);
   this.state = {
     isLoading: true,
     btnpress: true
   }
 }

GetData = async () => {
  /*
   Alert.alert("Login start", "Cluster name:"+cluster.name);
   fetch('https://data.'+cluster.name+'.hasura-app.io/v1/query', {
         method: 'post',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           "type": "select",
           "args": {
               "table": "equipments",
               "columns": [
                   "*"
               ]
           }
         })
       }).then((response) => response.json())
       .then((res) => {
         if(typeof(res) != "undefined"){
           Alert.alert("Error signing up", "Error: ");

         }
         else{
           let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
             isLoading: false,
             dataSource: ds.cloneWithRows(res),
           }, function() {
             // In this block you can do something with new state.
           });
           Alert.alert("Res1"+"body: "+res[0].name);
           this.setState({isLoading: false, btnpress: false});
         }
             }).catch((error) => {
               console.error(error);
             });
             */
             Alert.alert("Login start");
             fetch('https://auth.'+cluster.name+'.hasura-app.io/v1/login', {
                   method: 'post',
                   headers: {
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                     "type": "select",
                     "args": {
                         "table": "equipments",
                         "columns": [
                             "*"
                         ]
                     }
                   })
                 }).then((response) => response.json())
                 .then((res) => {
                   if(typeof(res) != "undefined"){
                     Alert.alert("Error signing up", "Error: "+ res.message);
                     console.log("error:"+res.message);
                   }
                   else{
                     Alert.alert("Auth token: "+res[0].name);
                   }
                       }).catch((error) => {
                         console.error(error);
                       });
 }

 render() {
   if (this.state.isLoading) {
     if (this.state.btnpress) {
       return (
         <View style={{flex: 1, paddingTop: 20}}>
         <TouchableOpacity
           onPress={this.GetData.bind(this)}>
           <Text> Click to get data</Text>
           </TouchableOpacity>
         </View>
       );
     }
     return (
       <View style={{flex: 1, paddingTop: 20}}>
         <ActivityIndicator />
       </View>
     );
   }

   return (

     <View style={styles.MainContainer}>
       <ListView
         dataSource={this.state.dataSource}
         style={{paddingRight: 10,}}
         renderRow={(rowData) =>
           <Animatable.View
              key={rowData.count}
              animation={'bounce'}
              delay={rowData.count * 100}
            >
        <Card style={{width: (Dimensions.get('window').width-50), flex:0, }} >
          <CardItem style={{paddingTop:0, }}>
          <Left>
          <Thumbnail  source={require('./images/sikh.png')}/>
          <Text> Kisan bhai</Text>
          </Left>
          <Right/>
          </CardItem >
          <CardItem style={{paddingTop:0,}}>
          <Image source = {{ uri: "https://filestore."+cluster.name+".hasura-app.io/v1/file/"+rowData.image }}
            style={{height: 220, width: (Dimensions.get('window').width-50), flex: 0}}/>
          </CardItem>
          <CardItem style={{paddingTop:0, }}>
              <Text>Name:  {rowData.name}</Text>
	</CardItem>
          <CardItem style={{paddingTop:0, }}>
              <Text>Seller: {rowData.seller} </Text>
	</CardItem>
          <CardItem style={{paddingTop:0, }}>
              <Text>Price: Rs. {rowData.price}</Text>
          </CardItem>
        </Card>
        </Animatable.View>
         }
       />
     </View>
   );
 }
}

const styles = StyleSheet.create({
MainContainer :{
flex:1,
alignItems: 'center',
paddingTop: (Platform.OS === 'ios') ? 20 : 0,
},
});

export default Mainproject;
