import {knuthShuffle} from 'knuth-shuffle';

const cats = [
  'https://cdn2.thecatapi.com/images/3sg.gif',
  'https://cdn2.thecatapi.com/images/7rq.gif',
  'https://cdn2.thecatapi.com/images/4pd.gif',
  'https://cdn2.thecatapi.com/images/3r7.gif',
  'https://cdn2.thecatapi.com/images/4i2.gif',
  'https://cdn2.thecatapi.com/images/MTY0MDM5NA.gif',
  'https://cdn2.thecatapi.com/images/88j.gif',
  'https://cdn2.thecatapi.com/images/MTczOTM3NQ.gif',
  'https://cdn2.thecatapi.com/images/a74.gif',
  'https://cdn2.thecatapi.com/images/8vj.gif',
  'https://cdn2.thecatapi.com/images/96i.jpg',
  'https://cdn2.thecatapi.com/images/8tk.jpg',
  'https://cdn2.thecatapi.com/images/gt.jpg',
  'https://cdn2.thecatapi.com/images/4ji.gif',
  'https://cdn2.thecatapi.com/images/4hf.gif',
  'https://cdn2.thecatapi.com/images/a8d.gif'
];

const getCats = () => {
  return cats;
};

const getRandomizedCats = () => {
  return knuthShuffle(cats);
};

export {getCats, getRandomizedCats};