import { resolve } from 'aurelia';
import { IAuthService } from '../../services/auth-service';
import { IApiService } from "../../services/api-service";
import { IRouteViewModel } from "@aurelia/router";

import { newInstanceForScope } from "@aurelia/kernel";
import {
  IValidationController,
  IValidationResultPresenterService,
} from "@aurelia/validation-html";
import { IValidationRules } from "@aurelia/validation";
import { IRouter } from "@aurelia/router";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class StoreCheckout implements IRouteViewModel {
    private api: IApiService = resolve(IApiService);
    private auth: IAuthService = resolve(IAuthService);
    private router: IRouter = resolve(IRouter);
    private validationController: IValidationController = resolve(newInstanceForScope(IValidationController));
    private readonly validationRules: IValidationRules = resolve(IValidationRules);
    private readonly presenter: IValidationResultPresenterService = resolve(IValidationResultPresenterService);

  private details = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    paymentType: "credit",
    ccName: "",
    ccNumber: "",
    ccExpiration: "",
    ccCvv: "",
  };

  private processing = false;

  private cart = [];
  private total;
  private totalItems = 0;

  constructor() {
    this.validationController.addSubscriber(this.presenter);

    this.validationRules
      .on(this.details)
      .ensure("firstName")
      .required()
      .ensure("lastName")
      .required()
      .ensure("email")
      .required()
      .email()
      .ensure("address")
      .required()
      .ensure("country")
      .required()
      .ensure("state")
      .required()
      .ensure("zip")
      .required()
      .ensure("paymentType")
      .required()
      .ensure("ccName")
      .required()
      .when((p) => p.paymentType === "credit")
      .ensure("ccNumber")
      .required()
      .when((p) => p.paymentType === "credit")
      .ensure("ccExpiration")
      .required()
      .when((p) => p.paymentType === "credit")
      .ensure("ccCvv")
      .required()
      .when((p) => p.paymentType === "credit");
  }

  public binding(): void {
    this.cart = this.api.getCart();
    this.totalItems = this.api.getCartTotal();

    this.calculateTotal();
  }

  public async submit(): Promise<void> {
    const result = await this.validationController.validate();

    console.log(result);

    if (result.valid) {
      this.processing = true;

      await sleep(1500); // wait 1.5 seconds before going to the server
      const order: { orderId: number; success: boolean } = await this.api.processOrder(this.auth.getCurrentUser().id, this.details, this.cart);

      if (order.success) {
        this.router.load(`/order/${order.orderId}`);
      }

      this.processing = false;
    }
  }

  private calculateTotal(): void {
    this.total = this.cart
      .reduce((runningTotal, product) => {
        const total = parseInt(product.quantity) * product.price;

        return runningTotal + total;
      }, 0)
      .toFixed(2);
  }
}
