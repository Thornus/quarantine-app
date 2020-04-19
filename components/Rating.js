import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as StoreReview from 'expo-store-review';
import { AirbnbRating } from 'react-native-ratings';
import { t } from 'i18n-js';
import design from '../utils/design';
import getSavedData from '../utils/getSavedData';
import saveData from '../utils/saveData';


const Rating = () => {
  const [hasRated, setHasRated] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    (async () => {
      let {rating: ratingValue} = await getSavedData('rating') || {};

      if(ratingValue) {
        setHasRated(true);
        setRating(ratingValue);
      }
    })();
  });

  requestReview = async (rating) => {
    if(!hasRated && rating >= 3) {
      if(StoreReview.isAvailableAsync()) {
        StoreReview.requestReview();
      }
  
      await saveData({rating}, 'rating');
      setHasRated(true);
    }
  };

  return(
    <View style={styles.container}>
      <AirbnbRating
        isDisabled={hasRated}
        defaultRating={rating}
        showRating={false}
        onFinishRating={requestReview}
        size={design.sizes.iconSize}
      />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginTop: design.spacing.smallMargin
  }
});