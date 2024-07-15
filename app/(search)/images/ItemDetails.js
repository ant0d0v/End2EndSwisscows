import BaseComponent from "../../../base/BaseComponent.js";
export default class ItemDetails extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.itemInDetailsPanel = this.page.locator(".image-view.aside.fade.in")
    this.imageInDetailsPanel = this.page.locator(".image-view.aside.fade.in .image img").nth(1)
    this.bookmarkButton = this.page.locator("figure button.bookmark use")
    this.nextButton = this.page.locator(".details-pane button.next")
    this.prevButton = this.page.locator(".details-pane button.prev")
    this.closeButton = this.page.locator(".details-pane button.close")

  }
  //Actions
  clickBookmarkButtonAndGetResponse = async () => {
    let response;
    const responsePromise = this.page.waitForResponse(`${ process.env.API_URL}/v4/user/images`)
    await this.clickElement(this.bookmarkButton,
      `bookmark button of image`
    );
    response = await responsePromise;
    const responseBody = await response.json();
    return responseBody.id;
  };
  
  clickBookmarkButton = async () => {
    await this.clickElement(this.bookmarkButton,
      `bookmark button of image`
    );
  };
  clickNextButton = async () => {
    await this.clickElement(this.nextButton,
      `next button of image`
    );
  };
  clickPrevButton = async () => {
    await this.clickElement(this.prevButton,
      `prev button of image`
    );
  };
  clickCloseButton = async () => {
    await this.clickElement(this.closeButton,
      `close button of image`
    );
  };
  getByAltAttributeImage = async () => {
    return await this.imageInDetailsPanel.getAttribute("alt")
  };

  //Verify

  expectBookmarkButtonIsActive = async () => {
    await this.expectElementToHaveJSProperty(this.bookmarkButton, "href.animVal","/images/icons.svg#bookmark")
  };
  expectBookmarkButtonIsNotActive = async () => {
    await this.expectElementToHaveJSProperty(this.bookmarkButton, "href.animVal","/images/icons.svg#bookmark-outline")
  };
  expectItemInDetailsPanelToBeHidden = async () => {
    await this.expectElementToBeHidden(this.itemInDetailsPanel)
  }
  expectItemInDetailsPanelToBeVisible = async () => {
    await this.expectElementToBeVisible(this.itemInDetailsPanel)
  }
  expectImageInDetailsPanelToBeVisible = async () => {
    await this.expectElementToBeVisible(this.imageInDetailsPanel)
  }


}
