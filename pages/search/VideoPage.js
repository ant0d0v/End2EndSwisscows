import { BasePage } from "../../base/BasePage.js";
import { VideoFilters } from "../../components/video/VideoFilters.js";
const { expect, context } = require("@playwright/test");

export class VideoPage extends BasePage {
  constructor(page) {
    super(page);
    this.videoFilters = new VideoFilters(page);
  }
}
