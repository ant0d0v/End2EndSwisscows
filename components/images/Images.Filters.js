import  BaseFilters  from "../../base/BaseFilters";
const { expect } = require("@playwright/test");

export default class ImagesFilters extends BaseFilters {
  constructor(page) {
    super(page);
  }
}