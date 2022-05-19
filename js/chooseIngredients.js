export const ingredients = new Object();

export function chooseIngredients(item, section) {
  const ingredient = section.dataset.ingredient;
  const itemName = item.querySelector('.item-title');
  const itemNameAPI = itemName.innerText.replace(' ', '_').toLowerCase();
  ingredients[ingredient] = itemNameAPI; //ingredients.broth:{'yasai_vegetarian'}

  saveLocalStorage(ingredients);
}

function saveLocalStorage(food) {
  const foodSaved = JSON.stringify(food);
  window.localStorage.setItem('order', foodSaved);
}
