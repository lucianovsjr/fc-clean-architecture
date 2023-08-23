import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Integration find product use case", () => {
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

    it("should find product", async () => {
        const productRepository = new ProductRepository();

        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const createInput = {
            type: 'a',
            name: 'Ball',
            price: 5.35,
        };
        const createdProduct = await productCreateUseCase.execute(createInput);

        const productUseCase = new FindProductUseCase(productRepository);
        const findInput = {
            id: createdProduct.id,
        };
        const output = await productUseCase.execute(findInput);

        expect(output).toEqual({
            id: createdProduct.id,
            name: createdProduct.name,
            price: createdProduct.price,
        });
    });
});