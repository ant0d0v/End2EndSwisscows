import { BaseFilters } from "../../base/BaseFilters";
const { expect } = require("@playwright/test");

export class WebFilters extends BaseFilters{
  constructor(page) {
    super(page);
  }
}
