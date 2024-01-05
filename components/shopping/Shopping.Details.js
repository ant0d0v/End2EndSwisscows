import BasePage from "../../base/BasePage";
const { expect } = require("@playwright/test");

export default class ShoppingDetails extends BasePage {
  constructor(page) {
    super(page);
  }
}
