import  BaseFilters  from "../../base/BaseFilters";
const { expect } = require("@playwright/test");

export default class ImageFilters extends BaseFilters {
  constructor(page) {
    super(page);
  }
}
