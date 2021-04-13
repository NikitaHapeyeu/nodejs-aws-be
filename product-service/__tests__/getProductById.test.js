
import getProductById from '../handlers/getProductById';
import { getMockedProducts } from '../utils/createMockData';
import { products } from '../data';

jest.mock('../utils/createMockData');

describe('getProductById', () => {
  afterEach(() => jest.resetAllMocks());

  test('should return 404 for non-existing product id', async () => {
    getMockedProducts.mockReturnValue(products);
    const event = { pathParameters: { id: '123' } };
    const response = await getProductById(event);
    expect(response).not.toBeNull();
    expect(response.statusCode).toBe(404);
  });

  test('should return 500 for failure', async () => {
    getMockedProducts.mockReturnValue(null);
    const event = { pathParameters: undefined };
    const response = await getProductById(event);
    expect(response).not.toBeNull();
    expect(response.statusCode).toBe(500);
  });

  test('should return 200 and return a product with id', async () => {
    getMockedProducts.mockReturnValue(products);
    const id = 'bb463b8b-b76c-4f6a-9726-65ab5730b69b';
    const event = { pathParameters: { id } };
    const response = await getProductById(event);
    expect(response).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
    expect(JSON.parse(response.body)).toMatchObject({ id });
  });
});