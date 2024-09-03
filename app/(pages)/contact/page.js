import BasePage from "../../../base/BasePage.js";
import Header from "../../(pages)/Header.js";
import Form from "./Form.js"

export default class ContactPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.form = new Form(page);

    //Locators
    this.allImages = this.page.locator("main.contact img:visible");
    this.successMessage = this.page.getByRole("heading", {
      name: "Thank you for contacting us!",
    });
    this.backToSearchButton = this.page.getByRole("link", {
      name: "Back to search",
    });
  }
  //Actions
  async open() {
    await this.openPage("/contact");
  }

  async clickBackToSearchButton() {
    await this.clickElement(this.backToSearchButton, `Back to search button`);
  }

  //Assert
  async expectBackToSearchButtonWhenHoveringToHaveColor(color) {
    await this.expectColorLinkWhenHovering(
      this.backToSearchButton,
      "background",
      color
    );
  }

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.allImages);
  };
}
