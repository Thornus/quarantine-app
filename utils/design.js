import { getDeviceType } from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const isTablet = getDeviceType() === 'Tablet';

// COLORS
const colors = {
  primaryColor: '#11999e',
  activeColor: '#6abfc2',
  activeIconColor: 'white',
  inactiveIconColor: 'rgba(12, 108, 112, 0.7)',
  fontColor: 'black',
  secondaryFontColor: 'white',
  errorColor: 'red'
};

// SIZES
const sizes = {
  buttonFontSize: isTablet ? wp('3%') : wp('4.5%'),
  bodyFontSize: isTablet ? wp('4%') :wp('5.5%'),
  headerFontSize: isTablet ? wp('5.5%') :wp('8%'),
  titleFontSize: isTablet ? wp('7%') :wp('10%'),
  iconSize: wp('7%')
};

// SPACING
const spacing = {
  extraSmallMargin: hp('0.5%'),
  smallMargin: hp('1%'),
  defaultMargin: hp('2%'),
  largeMargin: hp('4%'),
  extraLargeMargin: hp('8%')
};

// THEMES
const themes = {
  asteroid: ['#0F2027', '#203A43', '#2C5364'],
  coal: ['#EB5757', '#000000'],
  scooter: ['#36D1DC', '#5B86E5'],
  sky: ['#56CCF2', '#2F80ED'],
  sunset: ['#ff7e5f', '#feb47b'],
  white: ['#e4f9f5', '#ffffff']
}

// FONT FAMILIES
const fontFamilies = {
  regular: 'montserrat-regular',
  semibold: 'montserrat-semibold',
  bold: 'montserrat-bold',
}

const design = {
  colors,
  sizes,
  spacing,
  themes,
  fontFamilies
};

export default design;