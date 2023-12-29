import { BaseFilters } from "../../base/BaseFilters";
const { expect } = require("@playwright/test");

export class ImageFilters extends BaseFilters {
  constructor(page) {
    super(page);
  }
}
