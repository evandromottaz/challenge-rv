const API_URL = 'https://front-br-challenges.web.app/api/v1/ramen-go/?';

export const GET_PRODUCTS = async (params) => {
  let response;
  let json;
  try {
    response = await fetch(API_URL + params);
    json = await response.json();
  } catch (err) {
    console.error(err);
  }
  return json;
};
