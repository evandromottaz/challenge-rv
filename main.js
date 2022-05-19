import './style.css';
import { Carousel } from './js/Carousel';
import { ingredients, chooseIngredients } from './js/chooseIngredients';

import { sucessPage } from './js/fetch-food';
import { onClick, onTouchStart } from './js/Commons';

const carousel1 = new Carousel('.carousel-1');
const carousel2 = new Carousel('.carousel-2');

const sections = document.querySelectorAll('section');
sections.forEach((section) => {
  const items = section.querySelectorAll('.item');

  items.forEach((item) => {
    onClick(item, () => chooseIngredients(item, section));
    onTouchStart(item, () => chooseIngredients(item, section));
  });
});

submit.addEventListener('click', () => {
  if (ingredients.meat && ingredients.broth)
    sucessPage(ingredients.meat, ingredients.broth);
});
