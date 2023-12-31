import BaseComponent from "../base/BaseComponent";
import CharityPage from "../pages/static-pages/Charity.Page";
import DatacenterPage from "../pages/static-pages/Datacenter.Page";
import EducationPage from "../pages/static-pages/Education.Page";
import DonationPage from "../pages/static-pages/Donation.Page";
import ContactUsPage from "../pages/static-pages/ContactUs.Page";
export default class FooterFull extends BaseComponent {
  constructor(page) {
    super(page);

    this.charityProjectLink = this.page.getByRole("link", {
      name: "Charity Project",
    });
    this.dataCenterLink = this.page.getByRole("link", {
      name: "Our Datacenter",
    });
    this.donationLink = this.page.getByRole("link", { name: "Donation" });
    this.educationLink = this.page.getByRole("link", {
      name: "Media Education",
      exact: true,
    });
    this.contactUsLink = this.page.getByRole("link", { name: "Contact us" });
  }

  clickCharityProjectLink = async () => {
    await this.clickElement(
      this.charityProjectLink,
      `charity project link in the footer full`
    );
    return new CharityPage(this.page);
  };

  clickDatacentertLink = async () => {
    await this.clickElement(
      this.dataCenterLink,
      `Datacenter link in the footer full`
    );
    return new DatacenterPage(this.page);
  };

  clickEducationLink = async () => {
    await this.clickElement(
      this.educationLink,
      `Education link in the footer full`
    );
    return new EducationPage(this.page);
  };

  clickDonationLink = async () => {
    await this.clickElement(
      this.donationLink,
      `Donation link in the footer full`
    );
    return new DonationPage(this.page);
  };
  clickContactUsLink = async () => {
    await this.clickElement(
      this.contactUsLink,
      `Contact Us link in the footer full`
    );
    return new ContactUsPage(this.page);
  };
}
