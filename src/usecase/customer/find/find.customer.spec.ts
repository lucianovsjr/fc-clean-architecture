import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customer = new Customer("123", "John");
        const address = new Address("street", 123, "255", "city")
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const usecase = new FindCustomerUseCase(customerRepository);
        const input = {
            id: "123",
        };
        const result = usecase.execute(input);
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