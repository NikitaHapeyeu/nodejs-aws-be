import { query } from './pgClient';

const handler = async (event) => {

    console.log('Incoming event: ', event);

    try {
      const { rows: products } = await query(`SELECT p.id, p.title, p.description, p.price, p.image, s.count FROM product p INNER JOIN stock s ON p.id = s.product_id`);
      console.log('products: ', products);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(products),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: `Failed to retrive products due to ${JSON.stringify(error)}`,
        }),
      };
  }
}

export default handler;