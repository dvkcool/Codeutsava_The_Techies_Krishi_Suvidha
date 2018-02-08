import React, {Component} from 'react';
import { View, TouchableHighlight, Platform} from 'react-native';
import { Container, Content, Text, Header, Footer, Tab, Tabs, TabHeading, Icon, Left,
          Right, Body, Thumbnail, Title, Item, Card, Input, Button, StyleProvider, Fab  } from 'native-base';
import { StackNavigator } from 'react-navigation';
import {AppLoading } from 'expo';
import Homescr from './Homescreen';
import Notification from './Notification';
import Messages from './Messages';
import getTheme from './../native-base-theme/components';
import material from './../native-base-theme/variables/material';
import Entypo from 'react-native-vector-icons/Entypo';
export default class Mainsc extends Component {
  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
  await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });
  this.setState({ fontLoaded: true });
}
render() {
  if (!this.state.fontLoaded) {
  return (
    <AppLoading
      startAsync={this.componentWillMount}
      onFinish={() => this.setState({ fontLoaded: true })}
      onError={console.warn}
    />
  );
}
else{
  return (
    <StyleProvider style={getTheme(material)}>
     <Container>
       <Header hasTabs>
       <Left>
       <Thumbnail  source={require('./images/sikh.png')}/>
       </Left>
         <Body>
           <Text style={{fontSize:18}}>Kisan: Marketplace</Text>
         </Body>
         <Right/>
       </Header>
       <Tabs>
       <Tab heading={ <TabHeading><Icon name="ios-build" /><Text> Tools </Text></TabHeading>}>
       <Homescr />
       </Tab>
       <Tab heading={ <TabHeading><Icon name="ios-cog" /><Text> Equipments </Text></TabHeading>}>
       <Notification/>
       </Tab>
       <Tab heading={ <TabHeading><Icon name="ios-color-fill" /><Text> Fertilizer </Text></TabHeading>}>
       <Messages/>
       </Tab>
       </Tabs>
       <View>
       <Fab
       style={{ backgroundColor: 'orange' }}
       position="bottomRight">
       <Icon
            name='md-bulb'/>
       </Fab>
       </View>
     </Container>
      </StyleProvider>
  );

}
   }
  }
