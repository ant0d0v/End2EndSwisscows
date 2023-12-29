import { BaseFilters } from "../../base/BaseFilters";
const { expect } = require("@playwright/test");

export class ShopFilters extends BaseFilters {
  constructor(page) {
    super(page);
  }
}
