import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";


describe("Integration create product use case", () => {
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

    it("should create product with type a", async () => {
        const productRepository = new ProductRepository();
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
        const productRepository = new ProductRepository();
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
        const productRepository = new ProductRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: 'x',
            name: 'Bike',
            price: 48.99,
        };

        await expect(productUseCase.execute(input)).rejects.toThrow("Product type not supported");
    })
});