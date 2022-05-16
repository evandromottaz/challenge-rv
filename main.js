import './style.css';
import { Carousel } from './js/Carousel';
import { fetchProducts } from './js/fetch-products';

const carousel = new Carousel('.carousel', '.carousel-panel');
carousel.init();

const ingredients = new Object();
const sections = document.querySelectorAll('section');

function chooseIngredients(item, section) {
  const ingredient = section.dataset.ingredient;
  const itemName = item.querySelector('.item-title');
  const itemNameAPI = itemName.innerText.replace(' ', '_').toLowerCase();
  ingredients[ingredient] = itemNameAPI; //ingredients.broth:{'yasai_vegetarian'}
  console.log(ingredients);
}

sections.forEach((section) => {
  const items = section.querySelectorAll('.item');

  items.forEach((item) => {
    item.addEventListener('click', ({ currentTarget }) =>
      chooseIngredients(currentTarget, section),
    );
  });
});

async function getAPI(meat, broth) {
  const { data: product } = await fetchProducts(meat, broth);
  sucessPage(product);
}

submit.addEventListener('click', () => {
  if (ingredients.meat && ingredients.broth)
    getAPI(ingredients.meat, ingredients.broth);
});

async function sucessPage(product) {
  document.title = product.name;

  const pageResponse = await fetch('order.html');
  const pageHTML = await pageResponse.text();
  replacePage(pageHTML);

  // chosenImg.src = product.image;
  // chosenImg.alt = product.name;

  const chosenFoodText = document.querySelector('.chosen-food-text h2');
  chosenFoodText.innerHTML = product.name;
}

function replacePage(htmlText) {
  const newDiv = document.createElement('div');
  newDiv.innerHTML = htmlText;
  const posOrderPage = newDiv.querySelector('#posOrder');
  const preOrderPage = document.querySelector('#preOrder');
  preOrderPage.innerHTML = posOrderPage.innerHTML;
  preOrderPage.setAttribute('id', 'posOrder');
  newOrderButton.addEventListener('click', onHome);
}

function onHome() {
  location.href = 'index.html';
}
