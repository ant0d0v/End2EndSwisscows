import BaseComponent from "../../../base/BaseComponent";
import Offer from "./Offer";
const { expect } = require("@playwright/test");

export default class Details extends BaseComponent {
  constructor(page) {
    super(page);
    this.offer = new Offer(page)
  }
}
