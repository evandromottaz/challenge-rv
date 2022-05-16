import './style.css';
import { Carousel } from './js/Carousel';
import { fetchProducts } from './js/fetch-products';
import { ingredients, chooseIngredients } from './js/chooseIngredients';

const carousel = new Carousel('.carousel', '.carousel-panel');
carousel.init();

const sections = document.querySelectorAll('section');
sections.forEach((section) => {
  const items = section.querySelectorAll('.item');

  items.forEach((item) => {
    item.addEventListener('click', ({ currentTarget }) =>
      chooseIngredients(currentTarget, section),
    );
  });
});

submit.addEventListener('click', () => {
  if (ingredients.meat && ingredients.broth)
    sucessPage(ingredients.meat, ingredients.broth);
});

function changeContents(product) {
  document.title = product.name;
  chosenImg.src = product.image;
  chosenImg.alt = product.name;
  chosenFoodText.innerHTML = product.name;
}

async function sucessPage(meat, broth) {
  const product = await fetchProducts(meat, broth);
  const pageResponse = await fetch('order.html');
  const pageHTML = await pageResponse.text();

  replacePage(pageHTML);
  changeContents(product);
}

function replacePage(htmlText) {
  const newDiv = document.createElement('div');

  newDiv.innerHTML = htmlText;
  const posOrderPage = newDiv.querySelector('#posOrder');
  const preOrderPage = document.querySelector('#preOrder');

  preOrderPage.innerHTML = posOrderPage.innerHTML;
  preOrderPage.setAttribute('id', 'posOrder');
  location.href = '#'; // provisório

  newOrderButton.addEventListener('click', onHome);
}

function onHome() {
  location.reload();
}
