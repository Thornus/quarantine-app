import React, { useState, useEffect, useContext }  from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import { store } from '../store';
import design from '../utils/design';
import { getCats } from '../utils/cats';

const Dashboard = () => {
  const {state: globalState} = useContext(store);
  const {startDate, daysLength} = globalState;

  const [cats, setCats] = useState([]);

  const endDate = moment(startDate).add(daysLength, 'days');
  const today = moment();
  const daysCount = daysLength - endDate.diff(today, 'days');

  (async () => {
      let localCats = await getCats();
      setCats(localCats);
  })();

  return(
    <View style={styles.container}>
      <Image
        source={{uri: cats && cats[daysCount-1]}}
        resizeMode='cover'
        style={{width: wp('90%'), height: hp('38%')}}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    height: '45%',
    alignItems: 'center',
    marginTop: design.spacing.defaultMargin,
    marginBottom: design.spacing.defaultMargin
  }
});