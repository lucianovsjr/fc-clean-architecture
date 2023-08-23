import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product use case", () => {
    it("should create product with type a", async () => {
        const productRepository = MockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: 'a',
            name: 'Ball',
            price: 5.35,
        };

        const output = await productUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    })

    it("should create product with type b", async () => {
        const productRepository = MockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: 'b',
            name: 'Pen',
            price: 0.19,
        };

        const output = await productUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price * 2,
        });
    })

    it("should create product with invalid type", async () => {
        const productRepository = MockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: 'x',
            name: 'Bike',
            price: 48.99,
        };

        await expect(productUseCase.execute(input)).rejects.toThrow("Product type not supported");
    })
});