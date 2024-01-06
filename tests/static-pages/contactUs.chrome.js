import { test, expect } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/contact-page/testData.json"))
);

test("Check color of Send button when hovering ", async ({ contactUsPage }) => {
  //Assert
  await contactUsPage.expectColorLinkWhenHovering(contactUsPage.sendButton, "background", /rgb\(191, 0, 0\)/);
});

test(`Check border color of name, email, message when sending form with empty fields`, async ({
  contactUsPage
}) => {
  //Actions
  await contactUsPage.clickSendButton();
  //Assert
  await contactUsPage.expectBorderColorFormField(testData.formFields[0].yourName, testData.formFields[0].redColor);
  await contactUsPage.expectBorderColorFormField(testData.formFields[1].email, testData.formFields[1].redColor);
  await contactUsPage.expectBorderColorFormField(testData.formFields[2].yourMessage, testData.formFields[2].redColor);
});

test(`Check border color of name, email, message when sending form with name only`, async ({
  contactUsPage,
}) => {
  //Actions
  await contactUsPage.inputYouNameField("Test");
  await contactUsPage.clickSendButton();

  //Assert
  await contactUsPage.expectBorderColorFormField(testData.formFields[0].yourName, testData.formFields[0].greyColor);
  await contactUsPage.expectBorderColorFormField(testData.formFields[1].email, testData.formFields[1].redColor);
  await contactUsPage.expectBorderColorFormField(testData.formFields[2].yourMessage, testData.formFields[2].redColor);
});

test(`Check border color of name, email, message when sending form with email only`, async ({
  contactUsPage,
}) => {
  //Actions
  await contactUsPage.inputEmailField("test@gmail.com");
  await contactUsPage.clickSendButton();

  //Assert
  await contactUsPage.expectBorderColorFormField(testData.formFields[0].yourName, testData.formFields[0].redColor);
  await contactUsPage.expectBorderColorFormField(testData.formFields[1].email, testData.formFields[1].greyColor);
  await contactUsPage.expectBorderColorFormField(testData.formFields[2].yourMessage, testData.formFields[2].redColor);
});

test(`Check border color of name, email, message when sending form with message only`, async ({
  contactUsPage,
}) => {
  //Actions
  await contactUsPage.inputMessageField("Check form using automation testing using playwright");
  await contactUsPage.clickSendButton();

  //Assert
  await contactUsPage.expectBorderColorFormField(testData.formFields[0].yourName, testData.formFields[0].redColor);
  await contactUsPage.expectBorderColorFormField(testData.formFields[1].email, testData.formFields[1].redColor);
  await contactUsPage.expectBorderColorFormField(testData.formFields[2].yourMessage, testData.formFields[2].greyColor);
});

test("Check navigation to corresponding pages for  privacy link on the page", async ({
  contactUsPage
}) => {
  //Actions
  const currentPage = await contactUsPage.clickElementAndNavigateToNewPage(
    contactUsPage.privacyLink
  );

  //Assert
  await contactUsPage.expectHaveUrl(currentPage, "https://dev.swisscows.com/en/privacy");
  await contactUsPage.expectHaveTitle(currentPage, "Privacy Policy | Swisscows");
});

test("Check design of the Contact Us page ", async ({ contactUsPage }) => {
  //Assert
  await contactUsPage.expectScreenContactUsPage();
});

test("Check design dark theme of the  Contact Us page ", async ({
  contactUsPage
}) => {
  //Actions
  await contactUsPage.waitUntilPageIsFullyLoaded();
  await contactUsPage.headerStaticPages.clickHamburgerMenuButton();
  await contactUsPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await contactUsPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await contactUsPage.expectScreenContactUsPage();
});
