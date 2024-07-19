import BaseComponent from "../../base/BaseComponent.js";
export default class Logo extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.swisscows = this.page.getByRole('img', { name: 'Swisscows', exact: true })
  }
    
    //Verify
  expectSwisscowsLogoToBeVisible = async () => {
    await this.expectElementToBeVisible(this.swisscows);
  };

}

