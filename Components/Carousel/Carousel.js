import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Button, Header, Text, Divider, ButtonGroup, List, ListItem, Slider } from 'react-native-elements'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Carousel from 'react-native-snap-carousel';

const prayers = [
  "Fajr",
  "Zuhr",
  "Asr",
  "Maghrib",
  "Isha"
];

export default class MyCarousel extends React.Component {

  state = {
    prayer: "Fajr"
  }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text h1 style={styles.title}>{ item }</Text>
            </View>
        );
    }

    changeSlide = (index) => {
      // console.log(prayers[index])
      this.props.onSnapToItem(prayers[index])
    }

    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={prayers}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={100}
              inactiveSlideOpacity={0.3}
              inactiveSlideScale={0.5}
              onSnapToItem={(index)=>{this.changeSlide(index)}}
            />
        );
    }

}

const styles = StyleSheet.create({
  question: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25
  },
  toggleButton: {
    backgroundColor: "#e74c3c"
  },
});
