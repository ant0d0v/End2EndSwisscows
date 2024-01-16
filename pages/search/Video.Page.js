import BasePage from "../../base/BasePage.js";
import VideoFilters from "../../components/video/Video.Filters.js";
import VideoDetails from "../../components/video/Video.Details.js";
import VideoPlayer from "../../components/video/Video.Player.js";
import Header from "../../components/Header.js";
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
