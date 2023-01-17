import { ProductService } from 'src/infrastructure/api/shopping/catalog/product';
import { describe, beforeEach, it, expect, afterAll, beforeAll } from 'vitest';
import { ShoppingApiPort } from 'src/ports/shopping-port';
import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';
import fetch from 'node-fetch';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { createRandomCart } from '__test__/mocks/shopping/product';
// import { handlers, randomCart } from '__test__/mocks/handler';

const randomCart = createRandomCart();

describe('ProductService', () => {
    let service: ProductService;

    const server = setupServer(...handlers);

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    beforeEach(() => {
        // Assign the fetch function to a variable in the global scope
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).fetch = fetch;

        const api: ShoppingApiPort = new ShoppingApiAdapter(baseUrl);
        service = new ProductService(api);
    });

    it('should get products', async () => {
        const products = await service.getProducts();
        expect(products.data).toEqual(randomCart.data);
    });
});
