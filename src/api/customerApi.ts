import Base from "./baseApi";

class CustomerApi extends Base {
    constructor() {
        super();
    }

    public async getCustomers() {
        return await super.execute(this.Urls.customer.getcustomers, this.ApiMethod.get);
      };
}
const customerApi = new CustomerApi();
export { customerApi }