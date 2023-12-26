import { BasePage } from "../../base/BasePage";
import { StaticSlider } from "../../components/StaticSlider";
import { StaticVideoPlayer } from "../../components/StaticVideoPlayer";
const { expect, test } = require("@playwright/test");

export class CharityPage extends BasePage {
  constructor(page) {
    super(page);
    this.staticSlider = new StaticSlider(page);
    this.staticVideoPlayer = new StaticVideoPlayer(page);
  }
    
}
