import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js"
export default class ItemDetails extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(this.page);

    //Locators
    this.root = this.page.locator(".details");
    this.imageInDetailsPanel = this.root.locator(".image.loaded");
    this.resolution = this.root.locator(".metadata .resolution");
    this.site = this.root.locator(".site");
    this.media = this.root.locator(".media");
    this.title = this.root.locator(".title");
    this.bookmarkButton = this.page.locator("figure button.bookmark use");
    this.nextButton = this.page.locator(".details-pane button.next");
    this.prevButton = this.page.locator(".details-pane button.prev");
    this.closeButton = this.page.locator(".details-pane button.close");
    this.openSiteButton = this.page.getByRole("link", { name: "Open site" });
  }
  //Actions
  clickBookmarkButtonAndGetResponse = async () => {
    let response;
    const responsePromise = this.page.waitForResponse(
      `${process.env.API_URL}/v4/user/images`
    );
    await this.clickElement(this.bookmarkButton, `bookmark button of image`);
    response = await responsePromise;
    const responseBody = await response.json();
    return responseBody.id;
  };

  clickBookmarkButton = async () => {
    await this.clickElement(this.bookmarkButton, `bookmark button of image`);
  };
  clickNextButton = async () => {
    await this.clickElement(this.nextButton, `next button of image`);
  };
  clickPrevButton = async () => {
    await this.clickElement(this.prevButton, `prev button of image`);
  };
  clickCloseButton = async () => {
    await this.clickElement(this.closeButton, `close button of image`);
  };

  clickOpenSiteButton = async () => {
    await this.clickElement(this.openSiteButton, `Open site button`);
  };
  getByAltAttributeImage = async () => {
    return await this.imageInDetailsPanel.getAttribute("alt");
  };

  //Verify

  expectBookmarkButtonIsActive = async () => {
    await this.expectElementToHaveJSProperty(
      this.bookmarkButton,
      "href.animVal",
      "/images/icons.svg#bookmark"
    );
  };
  expectBookmarkButtonIsNotActive = async () => {
    await this.expectElementToHaveJSProperty(
      this.bookmarkButton,
      "href.animVal",
      "/images/icons.svg#bookmark-outline"
    );
  };

  expectImageInDetailsPanelToBeVisible = async () => {
    await this.expectElementToBeVisible(this.imageInDetailsPanel);
  };

  expectDetailsToHaveHeightAndWidth = async (valueOfHeight, valueOfWidth) => {
    await this.expectElementToHaveJSProperty(this.media, "offsetHeight", valueOfHeight);
    await this.expectElementToHaveJSProperty(this.media, "offsetWidth", valueOfWidth);
  };
  expectDetailsToBeInViewport = async () => {
    await this.expectElementToBeInViewport(this.media)
  };
  expectResolutionInformationNotToBeEmpty = async () => {
    await this.expectElementNotToBeEmpty(this.resolution);
  };
  expectSiteInformationNotToBeEmpty = async () => {
    await this.expectElementNotToBeEmpty(this.site);
  };

  expectTitleToContainText = async (text) => {
    await this.expectTextToContain(this.title, text);
  };
}
