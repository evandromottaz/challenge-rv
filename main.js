import './style.css';
import { NavButtons } from './js/classes/Carousel';
import { Active } from './js/classes/Active';
import { chooseIngredients, ingredients } from './js/IngredientsChosen';
import { onClick, onTouchStart } from './js/Commons';
import { sucessPage } from './js/FetchFood';

new Active('.items-1');
new Active('.items-2');

function isMobile() {
  if (matchMedia('(max-width:770px)').matches) {
    const carouselBroth = new NavButtons('.carousel-1');
    carouselBroth.addButtons();
    const carouselMeat = new NavButtons('.carousel-2');
    carouselMeat.addButtons();
  }
}
isMobile();

const sections = document.querySelectorAll('section');
sections.forEach((section) => {
  const items = section.querySelectorAll('.item');

  items.forEach((item) => {
    onClick(item, () => chooseIngredients(item, section));
    onTouchStart(item, () => chooseIngredients(item, section));
  });
});

onClick(submit, () => {
  if (ingredients.meat && ingredients.broth)
    sucessPage(ingredients.meat, ingredients.broth);
});
