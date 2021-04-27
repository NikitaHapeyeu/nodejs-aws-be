import { query, transaction } from './pgClient';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const handler = async (event) => {

    console.log('Incoming event: ', event);

    if (!event.body) {
        return {
          statusCode: 400, 
          headers: corsHeaders, 
          body: JSON.stringify({ error: "Missing product data" })
        }
    }

    const reqData = JSON.parse(event.body);

    console.log('reqData: ', reqData);

    try {
        validate(reqData);
    } catch (err) {
        return {
          statusCode: 400, 
          headers: corsHeaders,
          body: JSON.stringify({ error: err })
        }
    }

    const { title, description, price, count, image } = reqData;

    try {
        const productId = await transaction(async client => {
            const response = await client.query("INSERT INTO product (title, description, price, image) VALUES ($1, $2, $3, $4) RETURNING id", [title, description, price, image]);
            const productId = response.rows[0].id;
            await client.query("INSERT INTO stock (product_id, count) VALUES ($1, $2)", [productId, count])
            return productId;
        });
        return {
          statusCode: 200, 
          headers: corsHeaders, 
          body: JSON.stringify({id: productId, title: title, description: description, price: price, count: count }, null, 2)}
    } catch (e) {
        console.log("Error occurred while creating product", e);
        return {
            statusCode: 500, 
            headers: corsHeaders,
            body: JSON.stringify({error: "Error occurred while creating product"}, null, 2)
        }
    }
}

function validate(requestData) {
    const {title, description, price, count, image} = requestData;

    if (!title) {
        throw 'No title specified';
    }

    if (!description) {
        throw 'No description specified';
    }

    if (!price) {
        throw 'No price specified';
    }

    if (!count) {
        throw 'No count specified';
    }

    if (!image) {
      throw 'There in not image presented';
    }

    if (count <= 0) {
      throw 'Count should be a positive number';
    }
}

export default handler;
