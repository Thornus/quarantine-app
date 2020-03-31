export default getElasticFontSize = (str) => {
  if(str.length > 8) {
    return 60;
  } else if(str.length > 5) {
    return 80;
  } else {
    return 120;
  }
}