import  BaseFilters  from "../../base/BaseFilters";
const { expect } = require("@playwright/test");

export default class VideoFilters extends BaseFilters {
  constructor(page) {
    super(page);
  }
}
