import BaseComponent from "../../base/BaseComponent.js";
export default class Navigation extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.navigationButton = (value) =>
      this.page.getByRole("link", {
        name: value,
        exact: true,
      });
  }
  //Actions

  clickImageTab = async () => {
    await this.clickElement(
      this.navigationButton("Images"),
      `image button in the header`
    );
  };
  clickVideoTab = async () => {
    await this.clickElement(
      this.navigationButton("Video"),
      `video button in the header`
    );
  };
  clickMusicTab = async () => {
    await this.clickElement(
      this.navigationButton("Music"),
      `music button in the header`
    );
  };
  clickNewsTab = async () => {
    await this.clickElement(
      this.navigationButton("News"),
      `search button in the header`
    );
  };
  clickShoppingTab = async () => {
    await this.clickElement(
      this.navigationButton("Shopping"),
      `shopping button in the header`
    );
  };

  //Verify
}
