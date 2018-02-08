import React, {Component} from 'react';
import getImage from './getImage';

import  {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
  Platform,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import Calculator from './Calculator';
import Weather from './Weather';
import market from './market';
//Add your api key
var API_KEY = '94e20c84954a9c6a72e544826a540561';

class homeweb extends Component{
  constructor() {
    super();
    this.state = {
     temperature: null,
      humidity: null,
      windSpeed: null,
      icon: null,
      summary: '',
      loading: true
    };
  }


  componentWillMount() {

    fetch('https://api.forecast.io/forecast/' + API_KEY + '/-21.2514, -81.6296')
      .then(res => res.json())
      .then(resJson => this.setState({
        temperature: ((resJson.currently.temperature-32)*5/9).toFixed(2),
        humidity: resJson.currently.humidity,
        windSpeed: resJson.currently.windSpeed,
        icon: resJson.currently.icon,
        summary: resJson.currently.summary,
        loading: false
      }))
  }
  static navigationOptions = {
  title: 'Krishi Suvidha',
};
  render() {
    const { navigate } = this.props.navigation;
    if (this.state.loading) {
      return (
        <ActivityIndicator animating size="large" />
        // <View style={[styles.container, styles.center]}>
        //   <Text>Loading...</Text>
        // </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={[styles.iconContainer, styles.center]}>
          <Image source={getImage(this.state.icon)} style={styles.image} />
          <Text style={styles.summaryText}>{this.state.summary}</Text>
        </View>
        <View style={styles.numbersContainer}>
          <Text style={styles.lowerText}>Temperature: {this.state.temperature}°</Text>
          <Text style={styles.lowerText}>Humidity: {this.state.humidity}</Text>
          <Text style={styles.lowerText}>Wind Speed: {this.state.windSpeed}</Text>
        </View>
          <Button
            title="Market"
             text="Market"
             onPress={() =>
          navigate('market')}
           />
          <Button
            title="Weather Crop Selector"
             text="Weather Crop Selector"
             onPress={() =>
          navigate('Weather')}
           />
          <Button
            title="Seed amount Calculator"
             text="Seed amount Calculator"
             onPress={() =>
          navigate('Calculator')}
           />
      </View>
    );
  }
}

//This creates our StyleSheet, it's just like writing normal css... sort of
const styles = StyleSheet.create({
  //A container, we set flex: 1 which means "take up all available space". Because we are rendering this at the root it takes up the entire screen.
  container: {
    flex: 1,
    backgroundColor: '#4defd2',
    //paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
  },
  //Move the style from inline to an style in the StyleSheet
  image: {
    width: 200,
    height: 200
  },
  // This is the container for the icon and summary
  iconContainer: {
    flex: 1
  },
  // This is the container for the lower numbers
  numbersContainer: {
    flex: 1,
    alignItems: 'center' // we only want to center it in the middle horizontally and not vertically
  },
  // Text style for the summary text
  // Make the text larger, and also thickish
  summaryText: {
    fontSize: 32,
    fontWeight: "300"
  },
  // Text style for the lower text
  // Set the font size to smallish, and the text really thin, and add spacing on top and bottom
  lowerText: {
    fontSize: 22,
    fontWeight: "100",
    marginTop: 10,
    marginBottom: 10,
    //marginVertical: 10 we could just do marginVertical, it's specific for react-native and not a web standard
  },
  //This tells react to center all content horizontally, and vertically. Basically putting the thing in the middle of the screen.
  center: {
    alignItems: 'center', // center content horizontally in the middle
    justifyContent: 'center'// center content vertically
  }
});
const App = StackNavigator({
  Home: { screen: homeweb },
  Calculator: { screen: Calculator },
  Weather: { screen: Weather },
  market: { screen: market },
});
class qmain extends Component{
  render(){
    return(
    <View style={styles.container}>
    <App />
    </View>
    );
  }
}
export default qmain;
