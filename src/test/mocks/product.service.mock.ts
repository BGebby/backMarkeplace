export const mockProductService = {
    getAllProduct: jest.fn(() => [
      {
        id: 1,
        nombre: 'camisa',
        sku: 10,
        cantidad: 2,
        precio: 2000,
        user: {
          name: 'vendedor2',
        },
      },
    ]),
    register: jest.fn((dto) =>
      Promise.resolve({
        id: 1,
        ...dto,
        imagen: '/uploads/test.jpg',
      })
    ),
    getProduct: jest.fn(() =>
      Promise.resolve({
        id: 1,
        nombre: 'camisa',
        sku: 10,
        cantidad: 2,
        precio: 2000,
        user: {
          name: 'vendedor2',
        },
      })
    ),
  };
  



 