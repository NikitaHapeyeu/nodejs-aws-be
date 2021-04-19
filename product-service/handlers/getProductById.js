import { query } from './pgClient';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const buildResponse = (statusCode, body, headers) => ({statusCode, body: JSON.stringify(body), headers});

const handler = async (event) => {
  console.log('Incoming event: ', event);
  const id = event.pathParameters?.id;

  try {
    const { rows: products } = await query(`SELECT p.id, p.title, p.description, p.price, p.image, s.count FROM product p INNER JOIN stock s ON p.id = s.product_id WHERE p.id::text = $1`, [id]);

    if (!products) {
      throw new Error(JSON.stringify(buildResponse(500, {message:`Failed to retrieve products`})));
    }

    const product = products[0];
    if (!product) {
      throw new Error(JSON.stringify(buildResponse(404, {message:`Failed to retrieve product with id ${id}`})));
    }

    return buildResponse(200, products, cors);
  } catch(error) {
    return JSON.parse(error.message);
  }
};

export default handler; 