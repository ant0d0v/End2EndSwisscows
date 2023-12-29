import { BasePage } from "./BasePage";
const { expect } = require("@playwright/test");

export class BaseFilters extends BasePage {
  constructor(page) {
    super(page);
  }
}
