import React, { useState, useEffect, useContext }  from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import moment from 'moment';
import { store } from '../store';
import design from '../utils/design';
import { getRandomizedCats } from '../utils/cats';
import saveData from '../utils/saveData';
import getSavedData from '../utils/getSavedData';

const Dashboard = () => {
  const {state: globalState} = useContext(store);
  const {startDate, daysLength} = globalState;

  const [cats, setCats] = useState([]);

  const endDate = moment(startDate).add(daysLength, 'days');
  const today = moment();
  const daysCount = daysLength - endDate.diff(today, 'days');

  useEffect(() => {
    (async () => {
      if(!cats.length) {
        let localCats = await getSavedData('cats');

        if(!localCats) {
          localCats = getRandomizedCats();
          saveData(localCats, 'cats');
        }

        setCats(localCats);
      }
    })();
  });

  return(
    <View style={styles.container}>
      <Image
        source={{uri: cats && cats[daysCount-1]}}
        resizeMode='cover'
        style={{width: 280, height: 200}}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    alignItems: 'center',
    marginTop: design.spacing.defaultMargin,
    marginBottom: design.spacing.largeMargin
  }
});