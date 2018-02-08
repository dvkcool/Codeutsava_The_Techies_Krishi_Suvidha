import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { AppRegistry, StyleSheet, ActivityIndicator,
  ListView, Alert, Dimensions, View, TextInput,Image, Platform, Linking, Button, Picker} from 'react-native';

import {Thumbnail, Container, Content, Left, Item, Right, Text, Body, Header, Card, CardItem, } from 'native-base';
const cluster = require('./../cluster.json');

class Mainproject extends Component{
  static navigationOptions = {
    title: 'Calculator',
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedarea: "acre",
      selectedcrop: "onion",
    };
  }
  onValueChangearea(value: string) {
    this.setState({
      selectedarea: value
    });
  }
  onValueChangecrop(value: string) {
  this.setState({
    selectedcrop: value
  });
}

 getseeds= async () => {
   return fetch('https://data.'+cluster.name+'.hasura-app.io/v1/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
	    "type": "select",
    "args": {
        "table": "calculator",
        "columns": [
            "*"
        ],
        "where": {
            "cropna": {
                "$like": this.state.selectedcrop
            }
        }
    }
})

    })
         .then((response) => response.json())
         .then((responseJson) => {

           this.setState({
             isLoading: false,
           });
	var i=1;
	switch(this.state.selectedarea){
	case 'm2':
	i = 4046.86;
	break;
	case 'km2':
	i = 0.00404686;
	break;
	case 'bigha':
	i = 5/8;
	break;
	default:
	i= 1;
	break;
	}

		var j = i * responseJson[0].spa* this.state.area;
	Alert.alert("Suggestion", "According to me, you should plant only "+ j+"kg of seeds only \n\n It will result in "+responseJson[0].plants+" plants and a production of "+responseJson[0].prod);
         })
         .catch((error) => {
           console.error(error);
         });
 }
 render() {


   return (

     <View style={styles.MainContainer}>

     <Text style={{fontSize: 20}}>
      Grain seed calculator
     </Text>

        <Card style={{width: (Dimensions.get('window').width-50), flex:0, }} >
          <CardItem style={{paddingTop:0, }}>
          <Left>
          <Thumbnail  source={require('./images/sikh.png')}/>
          <Text> Kisan bhai</Text>
          </Left>
          <Right/>
          </CardItem >
          <CardItem>
          <Text> Please enter area of the field</Text>
          </CardItem>
          <CardItem>
          <TextInput
           placeholder="Enter Area of your field"
           onChangeText={ TextInputValue => this.setState({ area: TextInputValue }) }
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
          <Text> Select the dimensions: e.g acre, bigha, m2, km2</Text>
          </CardItem>
          <CardItem>
         <TextInput
           placeholder="Enter Dimensions of area"
           onChangeText={ TextInputValue => this.setState({ selectedarea: TextInputValue }) }
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
            <Text> Choose your best suited crop e.g. rice, wheat, cotton, tomato etc</Text>
          </CardItem>
          <CardItem>

          <TextInput
           placeholder="Enter Crop name"
           onChangeText={ TextInputValue => this.setState({ selectedcrop: TextInputValue }) }
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
             onPress={this.getseeds}
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
