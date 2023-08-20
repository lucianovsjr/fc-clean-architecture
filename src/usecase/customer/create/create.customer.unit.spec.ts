import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "street",
        city: "city",
        number: 123,
        zip: "255",
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip,
            }
        });
    });

    it("should thown an error when name is required", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should thown an error when street is required", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    });
});