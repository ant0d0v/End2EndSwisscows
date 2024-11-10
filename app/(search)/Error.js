import BaseComponent from "../../base/BaseComponent.js";
export default class Error extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.root = (name) => this.page.locator(`.main.${name}`)
    this.image = (error) => this.page.getByRole("heading", { name: error });
    this.notFoundimage = this.page.getByRole('img', { name: '404' })
  }
  
  //Verify
  takeSnapshot = async ( testInfo, expected = { 
    error: number,
    name: value
  }) => {
    await this.expectElementToBeVisible(this.image(expected.error))
    await this.expectPageElementToHaveScreenshot(
      this.root(expected.name),
      this.image(expected.error),
      testInfo
    );
  };
  takeSnapshotNotFoundImage = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.rootPage,
      this.notFoundimage,
      testInfo
    );
  };

}
