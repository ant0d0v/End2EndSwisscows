const { BasePage } = require('../base/BasePage')
import { CharityPage } from "../pages/static-pages/CharityPage";
import { DatacenterPage } from "../pages/static-pages/DatacenterPage";
import { EducationPage } from "../pages/static-pages/EducationPage";
import { DonationPage } from "../pages/static-pages/DonationPage";
export class FooterFull extends BasePage {
  constructor(page) {
    super(page);

    this.charityProjectLink = this.page.getByRole('link', { name: 'Charity Project' })
    this.dataCenterLink = this.page.getByRole('link', { name: 'Our Datacenter' })
    this.donationLink = this.page.getByRole("link", { name: 'Donation' });
    this.educationLink = this.page.getByRole('link', { name: 'Media Education', exact: true })
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

  clickEducationLink = async () => {
    await this.clickElement(this.educationLink,
      `Education link in the footer full`
    );
    return new EducationPage(this.page);
  };

  clickDonationLink = async () => {
    await this.clickElement(this.donationLink,
      `Education link in the footer full`
    );
    return new DonationPage(this.page);
  };
}