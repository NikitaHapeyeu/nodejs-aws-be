import * as faker from 'faker';

export const createProductMock = (id) => ({
  id: id ?? faker.random.uuid(),
  title: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  country: faker.address.country(),
  count: faker.random.number({ min: 0, max: 10 }),
  color: faker.commerce.color(),
  price: faker.random.float({ min: 5, max: 300, precision: 2 }),
  image: faker.image.imageUrl(undefined, undefined, undefined, true, true),
});

export const getMockedProducts = async (length = 10)=> {
  faker.seed(123);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Array.from({ length }, () => createProductMock()))
    }, 0);
  });
}