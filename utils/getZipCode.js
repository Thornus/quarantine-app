import usCities from '../data/us-cities';

export default getZipCode = (regionCode, city) => {
  const {zip_code} = usCities.find(cityData => {
    if(cityData.state === regionCode && cityData.city === city) {
      return true;
    }
  });

  return zip_code;
}