import BasePage from "../../base/BasePage.js";
import VideoFilters from "../../components/(search)/video/Video.Filters.js";
import VideoDetails from "../../components/(search)/video/Video.Details.js";
import VideoPlayer from "../../components/(search)/video/Video.Player.js";
import Header from "../../components/(search)/Header.js";
const { expect, context } = require("@playwright/test");

export default class VideoPage extends BasePage {
  constructor(page) {
    super(page);
    this.videoFilters = new VideoFilters(page);
    this.videoFilters = new VideoDetails(page);
    this.videoFilters = new VideoPlayer(page);
    this.header  = new Header(page);
  }
}
