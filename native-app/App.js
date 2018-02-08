import React, { PureComponent } from 'react'
import { View, Text,  Alert, Button, TextInput, TouchableOpacity } from 'react-native'
import Home from './src/Home';
const cluster = require('./cluster.json');
export default class App extends PureComponent{
  state = {
    username: '',
    password: '',
    auth_token: ''
  }

  Signup = async () => {
    Alert.alert("Login start", "Cluster name:"+cluster.name);
    fetch('https://auth.'+cluster.name+'.hasura-app.io/v1/signup', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "provider": "username",
            "data": {
                "username": this.state.username,
                "password": this.state.password
            }
          })
        }).then((response) => response.json())
        .then((res) => {
          if(typeof(res.message) != "undefined"){
            Alert.alert("Error signing up", "Error: "+ res.message);

          }
          else{
            this.setState({ auth_token: res.auth_token });
          }
              }).catch((error) => {
                console.error(error);
              });
  }
  Login = async () => {
    Alert.alert("Login start");
    fetch('https://auth.'+cluster.name+'.hasura-app.io/v1/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "provider": "username",
            "data": {
                "username": this.state.username,
                "password": this.state.password
            }
          })
        }).then((response) => response.json())
        .then((res) => {
          if(typeof(res.message) != "undefined"){
            Alert.alert("Error signing up", "Error: "+ res.message);

          }
          else{
            this.setState({ auth_token: res.auth_token });
            Alert.alert("Auth token: "+res.auth_token);
          }
              }).catch((error) => {
                console.error(error);
              });
  }
  render(){
    if(this.state.auth_token==''){
        return(
          <View style={{
            paddingTop: 50,
          }}>
          <TextInput
           placeholder="Enter User name"
           onChangeText={ TextInputValue => this.setState({ username : TextInputValue }) }
           underlineColorAndroid='transparent'
           style={
           {
               textAlign: 'center',
               width: '90%',
               marginBottom: 7,
               height: 40,
               borderRadius: 5 ,
           }
         }
         />
         <TextInput
          placeholder="Enter password"
          onChangeText={ TextInputValue => this.setState({ password : TextInputValue }) }
          underlineColorAndroid='transparent'
          style={
          {
              textAlign: 'center',
              width: '90%',
              marginBottom: 7,
              height: 40,
              borderRadius: 5 ,
          }
        }
        />
        <Button
          onPress={this.Signup.bind(this)}
          title="Signup"
          color="#841584"
          accessibilityLabel="Click to Signup"
        />
        <Button
          onPress={this.Login.bind(this)}
          title="Signup"
          color="#841584"
          accessibilityLabel="Click to Signup"
        />
          </View>
        );
      }
      else{
        return(
          <Home />
        );
    }

  }
}
