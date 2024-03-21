import { test, expect } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/pages/contact/testData.json"))
);
const constantsData = JSON.parse(
  JSON.stringify(require("../../data/project-constants/testData.json"))
);

test("Check color of Send button when hovering ", async ({ contactPage }) => {
  //Assert
  await contactPage.expectColorLinkWhenHovering(contactPage.sendButton, "background", /rgb\(191, 0, 0\)/);
});

test.skip(`Check border color of name, email, message when sending form with empty fields`, async ({
  contactPage
}) => {
  //Actions
  await contactPage.clickSendButton();
  //Assert
  await contactPage.expectBorderColorFormField(testData.formFields[0].yourName, testData.formFields[0].redColor);
  await contactPage.expectBorderColorFormField(testData.formFields[1].email, testData.formFields[1].redColor);
  await contactPage.expectBorderColorFormField(testData.formFields[2].yourMessage, testData.formFields[2].redColor);
});

test.skip(`Check border color of name, email, message when sending form with name only`, async ({
  contactPage
}) => {
  //Actions
  await contactPage.inputYouNameField("Test");
  await contactPage.clickSendButton();

  //Assert
  await contactPage.expectBorderColorFormField(testData.formFields[0].yourName, testData.formFields[0].greyColor);
  await contactPage.expectBorderColorFormField(testData.formFields[1].email, testData.formFields[1].redColor);
  await contactPage.expectBorderColorFormField(testData.formFields[2].yourMessage, testData.formFields[2].redColor);
});

test.skip(`Check border color of name, email, message when sending form with email only`, async ({
  contactPage
}) => {
  //Actions
  await contactPage.inputEmailField("test@gmail.com");
  await contactPage.clickSendButton();

  //Assert
  await contactPage.expectBorderColorFormField(testData.formFields[0].yourName, testData.formFields[0].redColor);
  await contactPage.expectBorderColorFormField(testData.formFields[1].email, testData.formFields[1].greyColor);
  await contactPage.expectBorderColorFormField(testData.formFields[2].yourMessage, testData.formFields[2].redColor);
});

test.skip(`Check border color of name, email, message when sending form with message only`, async ({
  contactPage
}) => {
  //Actions
  await contactPage.inputMessageField("Check form using automation testing using playwright");
  await contactPage.clickSendButton();

  //Assert
  await contactPage.expectBorderColorFormField(testData.formFields[0].yourName, testData.formFields[0].redColor);
  await contactPage.expectBorderColorFormField(testData.formFields[1].email, testData.formFields[1].redColor);
  await contactPage.expectBorderColorFormField(testData.formFields[2].yourMessage, testData.formFields[2].greyColor);
});

test(`Check send message using all required fields`, async ({
  contactPage, page
}) => {
  //Actions
  await contactPage.inputYouNameField("Test");
  await contactPage.inputEmailField("test@gmail.com");
  await contactPage.inputMessageField("My test");
  await contactPage.checkAgreeCheckbox()
  await contactPage.clickSendButton()

  //Assert
  await contactPage.expectH1Text(page, "Contact us")
  await contactPage.expectSuccessMessage()
  await contactPage.expectHaveUrl(page, "https://dev.swisscows.com/en/contact?success=true");
  
});

test(`Check "back to search" button `, async ({
  contactPage, page, home
}) => {
  //Actions
  await contactPage.inputYouNameField("Test");
  await contactPage.inputEmailField("test@gmail.com");
  await contactPage.inputMessageField("My test");
  await contactPage.checkAgreeCheckbox()
  await contactPage.clickSendButton()
  await contactPage.clickBackToSearchButton()

  //Assert
  await home.expectHaveUrl(page, constantsData.URL_MAIN_PAGE);
  await home.expectHaveTitle(page,constantsData.TITLE_MAIN_PAGE)
  
});

test(`Check the tooltip when sending a message without the "Agree" checkbox`, async ({
  contactPage
}) => {
  //Actions
  await contactPage.inputYouNameField("Test");
  await contactPage.inputEmailField("test@gmail.com");
  await contactPage.inputMessageField("My test");
  await contactPage.clickSendButton()

  //Assert
  await contactPage.expectAgreeCheckboxToHaveProperty("Please check this box if you want to proceed.")
});

test(`Check color of "back to search" when hovering `, async ({ 
  contactPage 
}) => {
  //Actions
  await contactPage.inputYouNameField("Test");
  await contactPage.inputEmailField("test@gmail.com");
  await contactPage.inputMessageField("My test");
  await contactPage.checkAgreeCheckbox()
  await contactPage.clickSendButton()

  //Assert
  await contactPage.expectColorLinkWhenHovering(contactPage.backToSearchButton, "background", /rgb\(191, 0, 0\)/);
});

test("Check navigation to corresponding pages for  privacy link on the page", async ({
  contactPage
}) => {
  //Actions
  const currentPage = await contactPage.clickElementAndNavigateToNewPage(
    contactPage.privacyLink
  );

  //Assert
  await contactPage.expectHaveUrl(currentPage, constantsData.URL_PRIVACY_POLICY);
  await contactPage.expectHaveTitle(currentPage, constantsData.TITLE_PRIVACY_POLICY);
});

test("Check design of the Contact Us page ", async ({ contactPage },testInfo) => {
  //Assert
  await contactPage.expectScreenContactPage(testInfo);
});

test("Check design dark theme of the  Contact Us page ", async ({
  contactPage
},testInfo) => {
  //Actions
  await contactPage.waitUntilPageIsFullyLoaded();
  await contactPage.header.clickHamburgerMenuButton();
  await contactPage.header.hamburgerMenu.clickThemeDropdown();
  await contactPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await contactPage.expectScreenContactPage(testInfo);
});
