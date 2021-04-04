import getAllProducts from '../handlers/getAllProducts';
import { getMockedProducts } from '../utils/createMockData';
import { products } from '../data';


jest.mock('../utils/createMockData');

describe('getAllProducts', () => {
  afterEach(() => jest.resetAllMocks());
  test('when products exist then return array of products', async () => {
    getMockedProducts.mockReturnValue(products);
    const response = await getAllProducts();
    expect(response).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
    expect(JSON.parse(response.body).length).toBe(2);
  });
});