import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const MockRepository = () => {
    const customer = new Customer("123", "John");
    const address = new Address("street", 123, "255", "city")
    customer.changeAddress(address);

    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test find customer use case", () => {
    it("should find a customer", async () => {
        const customerRepository = MockRepository();

        const usecase = new FindCustomerUseCase(customerRepository);
        const input = {
            id: "123",
        };
        const result = await usecase.execute(input);
        const output = {
            id: "123",
            name: "John",
            address: {
                street: "street",
                city: "city",
                number: 123,
                zip: "255",
            }
        }

        expect(result).toEqual(output);
    });
});