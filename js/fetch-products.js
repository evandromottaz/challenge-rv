import { GET_PRODUCTS } from '../api';

export async function fetchProducts(meat, broth) {
  const { data: product } = await GET_PRODUCTS(`meat=${meat}&broth=${broth}`);
  if (product) return product;
}
