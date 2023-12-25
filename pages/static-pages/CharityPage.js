import { BasePage } from "../../base/BasePage";
import { StaticSlider } from "../../components/StaticSlider";
const { expect, test } = require("@playwright/test");

export class CharityPage extends BasePage {
  constructor(page) {
      super(page);
      this.staticSlider = new StaticSlider(page);
    
  }
    
}
