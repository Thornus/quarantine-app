export default isValidNumber = (numberString) => {
  const validNumberRegex = /^\d{1,3}(,?\d{3})*(\.\d{0,2})?$/;

  if(typeof numberString === 'number') {
    numberString = numberString.toString();
  }

  if(validNumberRegex.test(numberString)) {
    return true;
  }

  return false;
}

/* 
  REGEX EXPLANATION
  if number doesn't contain commas:
  "1000" VALID
  "1.04" VALID
  "1." VALID
  "1.049" INVALID (max 2 decimals)

  if number contains commas, non-decimal digits have to be in groups of three:
  "1,000" VALID
  "1,200.98" VALID
  "1,0" INVALID
*/