import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const createInput = {
    id: "123",
    name: "Ball",
    price: 5.35,
};

const updateInput = {
    id: createInput.id,
    name: "Ball",
    price: 5.05,
};

const MockRepository = () => {
    const product = new Product(createInput.id, createInput.name, createInput.price);

    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    }
};

describe("Unit test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(updateInput);

        expect(output).toEqual(updateInput);
    });
});