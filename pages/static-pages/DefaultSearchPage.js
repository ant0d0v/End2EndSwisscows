import { BasePage } from "../../base/BasePage";
const { expect, context } = require("@playwright/test");
export class DefaultSearchPage extends BasePage {
  constructor(page) {
    super(page);
  }
}
