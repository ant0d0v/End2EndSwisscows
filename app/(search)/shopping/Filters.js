import BaseComponent from "../../../base/BaseComponent.js";
import { expect } from "@playwright/test";

export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.root = this.page.locator(".filters-pane .filters");
    this.filtersPanel = this.page.getByText("Sort ByBy popularityCheapest");
    this.filter = (name) => this.page.getByRole("heading", { name: name });
    this.item = (name) =>
      this.page.locator("li").filter({ hasText: name }).getByRole("img");
    this.sortItem = (name) => this.page.locator("li").filter({ hasText: name });
    this.lastFilter = this.page.getByRole("heading", {
      name: "Bildwiederholfrequenz",
    });
    this.more = this.page.getByText("More", { exact: true });
    this.less = this.page.getByText("Less", { exact: true });
    this.markenFilterItems = this.page.locator(
      ".filter:nth-child(2) .options .item"
    );
  }
  //Actions
  selectFilter = async (
    filters = {
      name: string,
      option: string,
    }
  ) => {
    await this.clickElement(
      this.filter(filters.name),
      `filter ${filters.name}`
    );
    await this.clickElement(
      this.item(filters.option),
      `item  ${filters.option}`
    );
  };

  clickDropdownFilterBy = async (
    filters = {
      name: string,
    }
  ) => {
    await this.clickElement(
      this.filter(filters.name),
      `filter ${filters.name}`
    );
  };

  clickMore = async () => {
    await this.clickElement(this.more, `more`);
  };
  clickLess = async () => {
    await this.clickElement(this.less, `less`);
  };

  selectFilterAndGetResponse = async (itemName) => {
    const responsePromise = this.page.waitForResponse(
      `${process.env.API_URL}/shopping/search?query=*`
    );
    await this.clickElement(this.sortItem(itemName), `item  ${itemName}`);
    const response = await responsePromise;
    return response;
  };

  scrollToLastFilter = async () => {
    await this.scrollByVisibleElement(this.lastFilter, "last filter");
  };

  //Verify
  expectListItemsFromMostExpensiveToCheapest = async (originalArray) => {
    let sortedArray = await originalArray.slice().sort((a, b) => b - a);
    expect(originalArray).toEqual(sortedArray);
  };

  expectListItemsFromCheapestToMostExpensive = async (originalArray) => {
    let sortedArray = await originalArray.slice().sort((a, b) => a - b);
    expect(originalArray).toEqual(sortedArray);
  };

  expectFiltersPaneToBeVisible = async () => {
    await this.expectElementToBeVisible(this.filtersPanel);
  };

  expectFiltersPaneToBeHidden = async () => {
    await this.expectElementToBeHidden(this.filtersPanel);
  };

  expectLastFilterToBeVisible = async () => {
    await this.expectElementToBeVisible(this.lastFilter);
  };

  expectLastFilterToBeVisible = async () => {
    await this.expectElementToBeVisible(this.lastFilter);
  };

  expectMarkenFilterToHaveCountItems = async (value) => {
    await this.expectListToHaveCount(this.markenFilterItems, value);
  };

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root,
      this.root,
      testInfo
    );
  };
}
