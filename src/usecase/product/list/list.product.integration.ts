import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "../create/create.product.usecase";

const product1 = ProductFactory.create("a", "Ball", 5.35);
const product2 = ProductFactory.create("b", "Pen", 0.19);
const products = [product1, product2];

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
    }
};

describe("Integration for list product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list a products", async () => {
        const productRepository = new ProductRepository();

        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const createInput1 = {
            type: 'a',
            name: 'Ball',
            price: 5.35,
        };
        const createdProduct1 = await productCreateUseCase.execute(createInput1);
        const createInput2 = {
            type: 'b',
            name: 'Pen',
            price: 0.19,
        };
        const createdProduct2 = await productCreateUseCase.execute(createInput2);
        const products = [createdProduct1, createdProduct2];

        const useCase = new ListProductUseCase(productRepository);
        const output = await useCase.execute({});

        expect(output.products.length).toBe(products.length);

        products.forEach((product, index) => {
            expect(output.products[index].id).toBe(product.id);
            expect(output.products[index].name).toBe(product.name);
            expect(output.products[index].price).toBe(product.price);
        })
    });
});
