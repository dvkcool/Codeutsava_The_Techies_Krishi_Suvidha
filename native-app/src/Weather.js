import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { AppRegistry, StyleSheet, ActivityIndicator,
  ListView, Alert, Dimensions, View, TextInput,Image, Platform, Linking, Button} from 'react-native';

import {Thumbnail, Container, Content, Left, Right, Text, Body, Card, CardItem} from 'native-base';


class Mainproject extends Component{
  static navigationOptions = {
    title: 'Weather crop',
  };
 constructor(props) {
   super(props);
   this.state = {
     isLoading: true,
     data: '',
     month: '',
   }
 }

GetItem (flower_name) {
 Alert.alert(flower_name);
 }

 getcropna= async () => {
   return fetch('https://data.hospitalize60.hasura-app.io/v1/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    "type": "select",
    "args": {
        "table": "weather",
        "columns": [
            "cropna"
        ],
        "where": {
            "$and": [
                {
                    "ms": {
                        "$lte": this.state.month
                    }
                },
                {
                    "me": {
                        "$gte": this.state.month
                    }
                }
            ]
        }
    }
})

    })
         .then((response) => response.json())
         .then((responseJson) => {

           this.setState({
             isLoading: false,
             data: responseJson[0].cropna
           });
           Alert.alert("Advice", "My advice is you try to plant any of these:\n"+this.state.data)
         })
         .catch((error) => {
           console.error(error);
         });
 }
 render() {


   return (

     <View style={styles.MainContainer}>
        <Card style={{width: (Dimensions.get('window').width-50), flex:0, }} >
          <CardItem style={{paddingTop:0, }}>
          <Left>
          <Thumbnail  source={require('./images/sikh.png')}/>
          <Text> Kisan bhai</Text>
          </Left>
          <Right/>
          </CardItem >
          <CardItem>
          <Text> Please enter month number to check Its Best crop possible</Text>
          </CardItem>
          <CardItem>
          <Text> e.g. Januay-1, February-2,....December-12</Text>
          </CardItem>
          <CardItem>
          <TextInput
           placeholder="Enter Month number"
           onChangeText={ TextInputValue => this.setState({ month: TextInputValue }) }
           underlineColorAndroid='transparent'
           style={
           {
               textAlign: 'center',
               width: '90%',
               marginBottom: 7,
               height: 40,
               borderWidth: 1,
               borderColor: '#FF5722',
               borderRadius: 5 ,
           }
          }
          />
          </CardItem>
          <CardItem>
          <Button
            title="Find Crop"
             text="Find month"
             onPress={this.getcropna}
           />
          </CardItem>
          <CardItem>

          </CardItem>
        </Card>

     </View>
   );
 }
}

const styles = StyleSheet.create({
MainContainer :{
flex:1,
alignItems: 'center',
paddingTop: 20,
},
});

export default Mainproject;
