import BaseComponent from "../base/BaseComponent.js";
export default class Footer extends BaseComponent {
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
    this.allInternalLinks = (locator) => this.page.getByRole('link', { name: locator, exact: true })
    this.allExternalLinks = (locator) => this.page.locator('li').filter({ hasText: locator})
    this.socialNetworksLinks = (index) => this.page.locator(`.social-networks > a:nth-child(${index})`)
    this.swisscowsAppLinks = (locator) => this.page.getByRole('link', { name: locator })
    this.swisscowsAppImages = this.page.locator(".app.mobile-hidden .app-link img") 
  }
  //Actions

  clickCharityProjectLink = async () => {
    await this.clickElement( this.charityProjectLink, 
      `charity project link in the footer full`);
  };

  clickDatacenterLink = async () => {
    await this.clickElement(this.dataCenterLink,
      `Datacenter link in the footer full`
    );
  };

  clickEducationLink = async () => {
    await this.clickElement(this.educationLink,
      `Education link in the footer full`
    );
  };

  clickDonationLink = async () => {
    await this.clickElement(this.donationLink,
      `Donation link in the footer full`
    );
  };
  clickContactUsLink = async () => {
    await this.clickElement(this.contactUsLink,
      `Contact Us link in the footer full`
    );
  };
  clickImprintLink = async () => {
    await this.clickElement(this.imprintLink,
      `Imprint link in the footer full`
    );
  };
  clickWhoWeAreLink = async () => {
    await this.clickElement(this.whoWeAreLink,
      `Who we are link in the footer full`
    );
  };

  clickEmailLinkAndNavigateToNewPage = async () => {
    const emailPage = await this.clickElementAndNavigateToNewPage(this.emailLink,`Email link in the footer full`)
    return emailPage;
  };
  clickVpnLinkAndNavigateToNewPage = async () => {
    const vpnPage = await this.clickElementAndNavigateToNewPage(this.vpnLink,`VPN link in the footer full`)
    return vpnPage;
  };
  clickAllInternalLink = async (locator) => {
    await this.clickElement(this.allInternalLinks(locator),
      `all internal link in the footer full`
    );
  };
  //Verify
  expectSwisscowsAppImagesToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.swisscowsAppImages);
}    
}
