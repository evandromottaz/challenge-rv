import { GET_FOOD } from '../api';

function changeContents(food) {
  document.title = food.name;
  chosenImg.src = food.image;
  chosenImg.alt = food.name;
  chosenFoodText.innerHTML = food.name;
}

export async function sucessPage(meat, broth) {
  console.log('Searching for food...');
  const { data: food } = await GET_FOOD(meat, broth);
  const pageResponse = await fetch('order.html');
  const pageHTML = await pageResponse.text();

  console.log('Changing the HTML...');
  replacePage(pageHTML);
  if (food) changeContents(food);
}

function replacePage(htmlText) {
  const newDiv = document.createElement('div');

  newDiv.innerHTML = htmlText;
  const posOrderPage = newDiv.querySelector('#posOrder');
  const preOrderPage = document.querySelector('#preOrder');

  preOrderPage.innerHTML = posOrderPage.innerHTML;
  preOrderPage.setAttribute('id', 'posOrder');
  location.href = '#';

  newOrderButton.addEventListener('click', onHome);
}

function onHome() {
  location.reload();
}
