import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Ball", 5.35);
const product2 = ProductFactory.create("b", "Pen", 0.19);
const products = [product1, product2]

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
    }
};

describe("Unit test for list product use case", () => {
    it("should list a products", async () => {
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);
        const output = await useCase.execute({});

        expect(output.products.length).toBe(products.length);

        products.forEach((product, index) => {
            expect(output.products[index].id).toBe(product.id);
            expect(output.products[index].name).toBe(product.name);
            expect(output.products[index].price).toBe(product.price);
        })
    });
});
