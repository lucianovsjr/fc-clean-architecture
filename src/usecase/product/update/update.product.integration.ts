import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Integration update product use case", () => {
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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();

        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const createInput = {
            type: 'a',
            name: 'Ball',
            price: 5.35,
        };
        const createdProduct = await productCreateUseCase.execute(createInput);

        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        const updateInput = {
            id: createdProduct.id,
            name: "Ball",
            price: 5.05,
        };
        const output = await productUpdateUseCase.execute(updateInput);

        expect(output).toEqual(updateInput);
    });
});