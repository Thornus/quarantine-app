export default (country, regionCode) => {
  const {name: regionName} = country !== '---' ? country.regions.find(region => region.shortCode === regionCode) || '---' : '---';
  return regionName;
}