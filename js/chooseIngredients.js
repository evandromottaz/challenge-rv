import { onClick } from './Commons';
import { onTouchStart } from './Commons';
import { sucessPage } from './FetchFood';

export const ingredients = new Object();

export function ChooseIngredients(item, section) {
  const ingredient = section.dataset.ingredient;
  const itemName = item.querySelector('.item-title');
  const itemNameAPI = itemName.innerText.replace(' ', '_').toLowerCase();
  ingredients[ingredient] = itemNameAPI; //ingredients.broth:{'yasai_vegetarian'}

  saveLocalStorage(ingredients);
  colorBgCta();
}

function colorBgCta() {
  const orderNames = Object.values(ingredients).length;
  if (orderNames === 2) {
    submit.classList.add('ready');
  }
}

function saveLocalStorage(food) {
  const foodSaved = JSON.stringify(food);
  window.localStorage.setItem('order', foodSaved);
}

const sections = document.querySelectorAll('section');
sections.forEach((section) => {
  const items = section.querySelectorAll('.item');

  items.forEach((item) => {
    onClick(item, () => ChooseIngredients(item, section));
    onTouchStart(item, () => ChooseIngredients(item, section));
  });
});

submit.addEventListener('click', () => {
  if (ingredients.meat && ingredients.broth)
    sucessPage(ingredients.meat, ingredients.broth);
});
