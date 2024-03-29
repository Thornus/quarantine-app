import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { store } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { AdMobBanner } from 'expo-ads-admob';
import design from '../utils/design';

const iphoneTestId = 'E55E2963-962A-42A2-9CF7-1D1BB80387A3';
const adUnitID = Platform.OS === 'ios' ? "ca-app-pub-1264194119076568/4378676945" : "ca-app-pub-1264194119076568/1836220184"; //"ca-app-pub-1264194119076568/4378676945"

export default GradientWrapper = ({viewExtendedStyle, style, children, noKeyboardDismiss, adPosition = 'top'}) => {
  const {state: globalState} = useContext(store);
  const {hasAds} = globalState;
  
  const adStyleBottom = adPosition === 'bottom' && {flexGrow: 1};
  const nativeAd = hasAds && <View style={{...adStyleBottom, alignSelf: 'center', justifyContent: 'flex-end'}}>
                    <AdMobBanner
                      adUnitID={adUnitID}
                      servePersonalizedAds
                      testDevices={[AdMobBanner.simulatorId, iphoneTestId]}
                      onDidFailToReceiveAdWithError={error => console.log(error)}
                      onAdViewDidReceiveAd={() => {console.log('Ad received!')}}/>
                  </View>;

  const content = <LinearGradient colors={design.themes.white} style={{flex: 1, ...style}}>
                    <SafeAreaView style={{...styles.container, ...viewExtendedStyle}}>
                      {adPosition === 'top' && nativeAd}
                      {children}
                      {adPosition === 'bottom' && nativeAd}
                    </SafeAreaView>
                  </LinearGradient>;

  if(noKeyboardDismiss) {
    return content;
  } else {
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {content}
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});