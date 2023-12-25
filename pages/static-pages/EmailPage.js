import { BasePage } from "../../base/BasePage";
const { expect, context } = require("@playwright/test");
export class EmailPage extends BasePage {
  constructor(page) {
    super(page);
  }
}
