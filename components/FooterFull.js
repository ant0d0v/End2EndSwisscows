const { BasePage } = require('../base/BasePage')
import { CharityPage } from "../pages/static-pages/CharityPage";
import { DatacenterPage } from "../pages/static-pages/DatacenterPage";
export class FooterFull extends BasePage {
  constructor(page) {
    super(page);

    this.charityProjectLink = this.page.getByRole('link', { name: 'Charity Project' })
    this.dataCenterLink = this.page.getByRole('link', { name: 'Our Datacenter' })
  }
  
  clickCharityProjectLink = async () => {
    await this.clickElement(this.charityProjectLink,
      `charity project link in the footer full`
    );
    return new CharityPage(this.page);
  };

  clickDatacentertLink = async () => {
    await this.clickElement(this.dataCenterLink,
      `Datacenter link in the footer full`
    );
    return new DatacenterPage(this.page);
  };
}