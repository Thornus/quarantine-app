import countryRegionData from 'country-region-data';

export default (countryCode) => {
  return countryRegionData.find(country => country.countryShortCode === countryCode) || '---';
}