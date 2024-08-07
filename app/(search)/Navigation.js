import BaseComponent from "../../base/BaseComponent.js";
export default class Navigation extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.imageSearchButton = this.page.getByRole("link", {
      name: "Images",
      exact: true,
    });
    this.videoSearchButton = this.page.getByRole("link", {
      name: "Video",
      exact: true,
    });
    this.musicSearchButton = this.page.getByRole("link", {
      name: "Music",
      exact: true,
    });
    this.newsSearchButton = this.page.getByRole("link", {
      name: "News",
      exact: true,
    });
    this.shoppingSearchButton = this.page.getByRole("link", {
      name: "Shopping",
      exact: true,
    });
  }
  //Actions

  clickImageTab = async () => {
    await this.clickElement(
      this.imageSearchButton,
      `image button in the header`
    );
  };
  clickVideoTab = async () => {
    await this.clickElement(
      this.videoSearchButton,
      `video button in the header`
    );
  };
  clickMusicTab = async () => {
    await this.clickElement(
      this.musicSearchButton,
      `music button in the header`
    );
  };
  clickNewsTab = async () => {
    await this.clickElement(
      this.newsSearchButton,
      `search button in the header`
    );
  };
  clickShoppingTab = async () => {
    await this.clickElement(
      this.shoppingSearchButton,
      `shopping button in the header`
    );
  };

  //Verify
}
