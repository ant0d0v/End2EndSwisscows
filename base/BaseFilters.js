import BasePage  from "./BasePage";
const { expect } = require("@playwright/test");

export default class BaseFilters extends BasePage {
  constructor(page) {
    super(page);
  }
}
