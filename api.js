const API_URL = 'https://front-br-challenges.web.app/api/v1/ramen-go/?';

export const GET_FOOD = async (meat, broth) => {
  let response;
  let json;
  try {
    response = await fetch(`${API_URL}meat=${meat}&broth=${broth}`);
    json = await response.json();
  } catch (err) {
    console.error(err);
  }
  return json;
};
