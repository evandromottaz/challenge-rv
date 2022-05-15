import { GET_PRODUCTS } from '../api';

export async function fetchProducts(meat, broth) {
  const json = await GET_PRODUCTS(`meat=${meat}&broth=${broth}`);
  if (json) return json;
}
