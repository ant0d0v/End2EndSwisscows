const { BasePage } = require('../base/BasePage')
import { CharityPage } from "../pages/static-pages/CharityPage";
export class FooterFull extends BasePage {
  constructor(page) {
    super(page);

    this.charityProjectLink = this.page.getByRole('link', { name: 'Charity Project' })
  }
  
  clickCharityProjectLink = async () => {
    await this.clickElement(
      this.charityProjectLink,
      `charity project link in the footer full`
    );
    return new CharityPage(this.page);
  };
}