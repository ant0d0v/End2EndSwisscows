import BaseComponent from "../../../base/BaseComponent.js";

export default class Player extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.cancelButton = this.page.getByRole('button', { name: 'Cancel' })
    this.okButton = this.page.getByRole('button', { name: 'OK' })
    this.checkbox = this.page.getByLabel('Don\'t remind me again')
    this.description = this.page.getByText('Video provider prevents')
    this.title = this.page.getByRole('heading', { name: 'Privacy Warning' })
    this.duration = this.page.frameLocator(`iframe[title*="Skofka" i]`).getByText(':02')
    this.videoPlayer = this.page.frameLocator(`iframe[title*="Skofka" i]`).locator('video')
  }
  //Actions
  clickOkButton = async () => {
    await this.clickElement( this.okButton,
      `ok button `
    );
  };
  clickCancelButton = async () => {
    await this.clickElement(this.cancelButton,
      `cancel button `
    );
  };
  selectCheckbox = async () => {
    await this.checkElement(this.checkbox,
      `cancel button `
    );
  };
  //Verify 
  async expectTimeToHaveText(value) {
    await this.expectTextToContain(this.duration,value);
  }
}
