import BaseComponent from "../../../base/BaseComponent.js";
import ButtonMenu from "../../../components/ButtonMenu.js";

export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    this.buttonMenu = new ButtonMenu(page);

    //Locators
    this.filterByDate = this.page.getByRole("button", {
      name: "Filter by date",
    });
    this.filterPublisher = this.page.getByRole("button", { name: "Publisher" });
    this.filterView = this.page.getByRole("button", { name: "List view" });
    this.attributeFilterByDate = this.page.locator("div.button-menu").nth(1);
  }

  //Actions
  clickFilterByDate = async () => {
    await this.clickElement(this.filterByDate, `filter by date in dropdown`);
  };
  clickPublisher = async () => {
    await this.clickElement(
      this.filterPublisher,
      `filter publisher in dropdown`
    );
  };
  clickView = async () => {
    await this.clickElement(this.filterView, `filter View in dropdown`);
  };

  //Verify
  expectByDateIsOpened = async () => {
    await this.expectAttributeClassOfElement(
      this.attributeFilterByDate,
      /open/
    );
  };

  expectByDateIsClosed = async () => {
    await this.expectAttributeClassOfElement(
      this.attributeFilterByDate,
      "button-menu"
    );
  };
}
