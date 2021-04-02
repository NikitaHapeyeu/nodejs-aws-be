import { getMockedProducts } from '../utils/createMockData';

const handler = async (event) => {
    try {
      const products = await getMockedProducts();
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

// import { products } from '../data';

// const handler = async () => {
//   try {
//     return {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       },
//       body: JSON.stringify(products),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: `Failed to retrive products due to ${JSON.stringify(error)}`,
//       }),
//     };
//   }
// };

export default handler;