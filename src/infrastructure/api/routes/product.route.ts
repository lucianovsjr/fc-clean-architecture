import { Router, Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";

export const productRoute = Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    try {
        const productDto: InputCreateProductDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price,
        };
        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const repository = new ProductRepository();
    const usecase = new ListProductUseCase(repository);

    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
