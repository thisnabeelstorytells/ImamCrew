import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Button, Header, Text, Divider, ButtonGroup, List, ListItem, Slider } from 'react-native-elements'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Carousel from 'react-native-snap-carousel';

import MyCarousel from '../Carousel/Carousel.js';
import ComingToggle from '../Buttons/ComingToggle.js';

import Moment from 'react-moment';
import 'moment-timezone';
import * as firebase from 'firebase';

import CalendarStrip from 'react-native-calendar-strip';
import {
  StackNavigator,
} from 'react-navigation';

const defaultPrayerList = {
    "Fajr": {
      "available": []
    },
    "Zuhr": {
      "available": []
    },
    "Asr": {
      "available": []
    },
    "Maghrib": {
      "available": []
    },
    "Isha": {
      "available": []
    }
}

export default class CalendarPage extends React.Component {

  constructor() {
    super();
    itemsRef = firebase.database().ref();
    this.checkStats();
  }

  ShowCurrentDate=()=>{

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return(year + '-' + month + '-' + date);
  }

  state = {
    index: 0,
    available: defaultPrayerList,
    date: this.ShowCurrentDate(),
    prayer: "Fajr",
    badgeColor: "red"
  }

  updateIndex = (index) => {
    if (this.state.index === index ){

    } else {
      this.setState({index})

      // console.log(this.state.available)

      prayer = this.state.prayer
      if (this.state.available && this.state.available[prayer] && this.state.available[prayer]["available"]) {
        list = this.state.available[prayer]["available"]
        if (list.includes(2)) {
          list = list.filter(item => item !== 2)
        } else {
          list.push(2)
        }
        itemsRef.child(this.state.date).child(this.state.prayer).update({
          available: list
        })
      } else {
        itemsRef.child(this.state.date).child(this.state.prayer).update({
          available: [2]
        })
      }
      this.setPrayer(prayer)
    }
  }

  checkStats = () => {
    fetch('https://imamcrew-1951e.firebaseio.com' + `/${this.state.date}` + '.json')
    .then((response) => {return response.json() })
    .then((data) => {

      this.setState({
        available: data
      });
      this.fixList();

      if (this.comingCheck(2)) {
        this.setState({
          index: 1
        })
      } else {
        this.setState({
          index: 0
        })
      }
    })
  }

  fixList = () => {
    list = defaultPrayerList
    prayer = this.state.prayer
    console.log(list[prayer])
  }

  setPrayer = (prayer) => {
    this.setState({
      date: this.state.date,
      prayer: prayer,
      available: [],
      index: 0
    })
    this.checkStats()
  }

  comingCheck = (id) => {
    prayer = this.state.prayer
    if ((this.state.available != null) && (this.state.available[prayer] != null) && (this.state.available[prayer]["available"] != null) && (this.state.available[prayer]["available"].includes(id))) {
      return true
    } else {
      return false
    }
  }

  findBadgeDetails = (id) => {
    // console.log(this.state.available)
    if (this.comingCheck(id)) {
      return {
        color: "green",
        text: "Is Coming"
      }
    } else {
      return {
        color: "red",
        text: "Not Coming"
      }
    }
  }

  goHome = () => {
    console.log("Go Home")
  }

  render() {

    const list = [
      {
        name: 'Ruhullah',
        id: 1
      },
      {
        name: 'Nabeel Khan',
        id: 2
      },
      {
        name: 'Farhan',
        id: 3
      },
      {
        name: 'Yusuf',
        id: 4
      }
    ]

    return (
      <View style={styles.container}>
        <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'ImamCrew', style: { color: '#fff' } }}
  rightComponent={{ icon: 'refresh', color: '#fff', onPress: () => this.checkStats() }}
/>

        <View style={styles.question}>
          <Text h4>{this.state.date}</Text>

          <MyCarousel onSnapToItem={(prayer)=>this.setPrayer(prayer)}></MyCarousel>

        </View>
        <View>
                <CalendarStrip/>
            </View>

        <ComingToggle
          selectedIndex={this.state.index}
          onPress={this.updateIndex}
          >
        </ComingToggle>

    <List containerStyle={{marginBottom: 20}}>
      {
        list.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            rightIcon={{style: {height: 0, opacity: 0}}}
            badge={{
              value: this.findBadgeDetails(l.id)["text"],
              textStyle: { color: 'white' },
              containerStyle: {
                marginTop: 0,
                marginRight: -30,
                backgroundColor: this.findBadgeDetails(l.id)["color"]
              }
            }}
          />
        ))
      }
    </List>

    <CalendarList
      current={this.state.date}
      onDayPress={(day) => {
        this.setState({ date: day.dateString})
        this.checkStats()
      }}
      pastScrollRange={50}
      futureScrollRange={50}
      scrollEnabled={true}
      showScrollIndicator={true}
    />
      </View>
    );
  }

  toggleButton = () => {
    this.setState({
        coming: !this.state.coming,
        badgeColor: "green"
    })
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
