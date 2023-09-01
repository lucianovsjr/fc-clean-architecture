import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import { app, sequelize } from "../express";
import request from "supertest";

const createProductAInput: InputCreateProductDto = {
    type: "a",
    name: "Pen",
    price: 2.5,
}

const createProductBInput: InputCreateProductDto = {
    type: "b",
    name: "Bike",
    price: 41.55,
}

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product with type a", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: createProductAInput.type,
                name: createProductAInput.name,
                price: createProductAInput.price,
            });

        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(expect.any(String));
        expect(response.body.name).toBe(createProductAInput.name);
        expect(response.body.price).toBe(createProductAInput.price);
    });

    it("should create a product with type b", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: createProductBInput.type,
                name: createProductBInput.name,
                price: createProductBInput.price,
            });

        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(expect.any(String));
        expect(response.body.name).toBe(createProductBInput.name);
        expect(response.body.price).toBe(createProductBInput.price * 2);
    });

    it("should not create a product", async () => {
        const createProductInput = {
            name: "Pen",
            price: 2.5,
        }
        const response = await request(app)
            .post("/product")
            .send({
                name: createProductInput.name,
                price: createProductInput.price,
            });

        expect(response.status).toBe(500);
    });

    it("should lista all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: createProductAInput.type,
                name: createProductAInput.name,
                price: createProductAInput.price,
            });
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                type: createProductBInput.type,
                name: createProductBInput.name,
                price: createProductBInput.price,
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const productA = listResponse.body.products[0];
        expect(productA.id).toEqual(expect.any(String));
        expect(productA.name).toBe(createProductAInput.name);
        expect(productA.price).toBe(createProductAInput.price);

        const productB = listResponse.body.products[1];
        expect(productB.id).toEqual(expect.any(String));
        expect(productB.name).toBe(createProductBInput.name);
        expect(productB.price).toBe(createProductBInput.price * 2);
    })
});