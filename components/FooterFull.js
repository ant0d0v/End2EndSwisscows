import BaseComponent from "../base/BaseComponent";
import CharityPage from "../app/(pages)/Charity.Page";
import DatacenterPage from "../app/(pages)/Datacenter.Page";
import EducationPage from "../app/(pages)/Education.Page";
import DonationPage from "../app/(pages)/Donation.Page";
import ContactUsPage from "../app/(pages)/ContactUs.Page";
import ImprintPage from "../app/(pages)/Imprint.Page";
import WhoWeArePage from "../app/(pages)/WhoWeAre.Page";
export default class FooterFull extends BaseComponent {
  constructor(page) {
    super(page);

    this.charityProjectLink = this.page.getByRole("link", { name: "Charity Project", });
    this.dataCenterLink = this.page.getByRole("link", { name: "Our Datacenter", });
    this.donationLink = this.page.getByRole("link", { name: "Donation" });
    this.educationLink = this.page.getByRole("link", { name: "Media Education", exact: true, });
    this.contactUsLink = this.page.getByRole("link", { name: "Contact us" });
    this.imprintLink = this.page.getByRole('link', { name: 'Imprint' });
    this.emailLink = this.page.getByRole('link', { name: 'Swisscows.email' })
    this.vpnLink = this.page.getByText('VPN')
    this.whoWeAreLink = this.page.getByRole('link', { name: 'Who we are' })
  }
  //Actions

  clickCharityProjectLink = async () => {
    await this.clickElement( this.charityProjectLink, 
      `charity project link in the footer full`);
    return new CharityPage(this.page);
  };

  clickDatacenterLink = async () => {
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
      `Donation link in the footer full`
    );
    return new DonationPage(this.page);
  };
  clickContactUsLink = async () => {
    await this.clickElement(this.contactUsLink,
      `Contact Us link in the footer full`
    );
    return new ContactUsPage(this.page);
  };
  clickImprintLink = async () => {
    await this.clickElement(this.imprintLink,
      `Imprint link in the footer full`
    );
    return new ImprintPage(this.page);
  };
  clickWhoWeAreLink = async () => {
    await this.clickElement(this.whoWeAreLink,
      `Who we are link in the footer full`
    );
    return new WhoWeArePage(this.page);
  };

  clickEmailLinkAndNavigateToNewPage = async () => {
    const emailPage = await this.clickElementAndNavigateToNewPage(this.emailLink,`Email link in the footer full`)
    return emailPage;
  };
  clickVpnLinkAndNavigateToNewPage = async () => {
    const vpnPage = await this.clickElementAndNavigateToNewPage(this.vpnLink,`VPN link in the footer full`)
    return vpnPage;
  };
}
