import {knuthShuffle} from 'knuth-shuffle';
import saveData from '../utils/saveData';
import getSavedData from '../utils/getSavedData';

const cats = [
  'https://cdn2.thecatapi.com/images/3sg.gif',
  'https://cdn2.thecatapi.com/images/7rq.gif',
  'https://cdn2.thecatapi.com/images/4pd.gif',
  'https://cdn2.thecatapi.com/images/3r7.gif',
  'https://cdn2.thecatapi.com/images/4i2.gif',
  'https://cdn2.thecatapi.com/images/MTY0MDM5NA.gif',
  'https://cdn2.thecatapi.com/images/ajo.gif',
  'https://cdn2.thecatapi.com/images/MTczOTM3NQ.gif',
  'https://cdn2.thecatapi.com/images/7dv.gif',
  'https://cdn2.thecatapi.com/images/8vj.gif',
  'https://cdn2.thecatapi.com/images/96i.jpg',
  'https://cdn2.thecatapi.com/images/8tk.jpg',
  'https://cdn2.thecatapi.com/images/4bk.gif',
  'https://cdn2.thecatapi.com/images/4ji.gif',
  'https://cdn2.thecatapi.com/images/4hf.gif',
  'https://cdn2.thecatapi.com/images/a8d.gif'
];

const getCats = async () => {
  let currentCats = await getSavedData('cats');
  
  if(!currentCats) {
    currentCats = knuthShuffle(cats); //randomize cats
    await saveData(currentCats, 'cats');
  }

  return currentCats;
};

export { getCats };