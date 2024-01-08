import BasePage  from "./BasePage";
const { expect } = require("@playwright/test");

export default class BaseComponent extends BasePage {
  constructor(page) {
    super(page);
  }
}
