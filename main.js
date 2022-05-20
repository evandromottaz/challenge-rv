import './style.css';
import Carousel from './js/Carousel';
import Active from './js/Active';
import { ingredients, chooseIngredients } from './js/chooseIngredients';
import { sucessPage } from './js/fetch-food';
import { onClick, onTouchStart } from './js/Commons';

new Active('.items-1');
new Active('.items-2');

if (matchMedia('(max-width:770px)').matches) {
  new Carousel('.carousel-1');
  new Carousel('.carousel-2');
}

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
