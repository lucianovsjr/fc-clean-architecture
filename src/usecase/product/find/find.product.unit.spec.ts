import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const createInput = {
    id: '123abc',
    name: 'Ball',
    price: 5.35,
};

const findInput = {
    id: createInput.id,
};

const MockRepository = () => {
    const product = new Product(createInput.id, createInput.name, createInput.price);

    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find product use case", () => {
    it("should find product", async () => {
        const productRepository = MockRepository();
        const productUseCase = new FindProductUseCase(productRepository);

        const output = await productUseCase.execute(findInput);

        expect(output).toEqual({
            id: createInput.id,
            name: createInput.name,
            price: createInput.price,
        });
    })
});