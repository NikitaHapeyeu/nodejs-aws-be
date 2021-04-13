import { getMockedProducts } from '../utils/createMockData';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const buildResponse = (statusCode, body, headers) => ({statusCode, body: JSON.stringify(body), headers});

const handler = async (event) => {
  const id = event.pathParameters?.id;

  try {
    const products = await getMockedProducts();

    if (!products) {
      throw new Error(JSON.stringify(buildResponse(500, {message:`Failed to retrieve products`})));
    }

    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error(JSON.stringify(buildResponse(404, {message:`Failed to retrieve product with id ${id}`})));
    }

    return buildResponse(200, product, cors);
  } catch(error) {
    return JSON.parse(error.message);
  }
};

export default handler; 