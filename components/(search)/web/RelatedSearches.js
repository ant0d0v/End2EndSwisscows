import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class RelatedSearches extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.listRelatedSearches = this.page.getByRole('listitem').getByRole('link', { name: /ronaldo/ })
    this.firstCriteriaInRelatedSearches = this.page.getByRole('listitem')
    .getByRole('link', { name: /ronaldo/ }).nth(1)
  }
  //Actions
  clickFirstCriteriaInRelatedSearches = async () => {
    await this.clickElement( this.firstCriteriaInRelatedSearches,
      `first criteria in Related searches `
    );
    return this;
  };
  // Verify
  expectRelatedSearchesToHaveCount = async (number) => {
    this.expectListToHaveCount(this.listRelatedSearches, number)
  };
  expectRelatedSearchesToContains = async (criteria) => {
    this.expectTextsToContains(this.listRelatedSearches, criteria);
  };

}

