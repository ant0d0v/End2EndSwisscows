import { test, expect } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/contact-page/testData.json"))
);
const constantsData = JSON.parse(
  JSON.stringify(require("../../data/project-constants/testData.json"))
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

test(`Check send message using all required fields`, async ({
  contactUsPage,page
}) => {
  //Actions
  await contactUsPage.inputYouNameField("Test");
  await contactUsPage.inputEmailField("test@gmail.com");
  await contactUsPage.inputMessageField("My test");
  await contactUsPage.checkAgreeCheckbox()
  await contactUsPage.clickSendButton()

  //Assert
  await contactUsPage.expectH1Text(page, "Contact us")
  await contactUsPage.expectSuccessMessage()
  await contactUsPage.expectHaveUrl(page, "https://dev.swisscows.com/en/contact?success=true");
  
});


test(`Check the tooltip when sending a message without the "Agree" checkbox`, async ({
  contactUsPage
}) => {
  //Actions
  await contactUsPage.inputYouNameField("Test");
  await contactUsPage.inputEmailField("test@gmail.com");
  await contactUsPage.inputMessageField("My test");
  await contactUsPage.clickSendButton()

  //Assert
  await contactUsPage.expectAgreeCheckboxToHaveProperty("Please check this box if you want to proceed.")
});

test(`Check color of "back to search" when hovering `, async ({ 
  contactUsPage 
}) => {
  //Actions
  await contactUsPage.inputYouNameField("Test");
  await contactUsPage.inputEmailField("test@gmail.com");
  await contactUsPage.inputMessageField("My test");
  await contactUsPage.checkAgreeCheckbox()
  await contactUsPage.clickSendButton()

  //Assert
  await contactUsPage.expectColorLinkWhenHovering(contactUsPage.backToSearchButton, "background", /rgb\(191, 0, 0\)/);
});


test("Check design of the Contact Us page ", async ({ contactUsPage },testInfo) => {
  //Assert
  await contactUsPage.expectScreenContactUsPage(testInfo);
});

test("Check design dark theme of the  Contact Us page ", async ({
  contactUsPage
},testInfo) => {
  //Actions
  await contactUsPage.waitUntilPageIsFullyLoaded();
  await contactUsPage.headerStaticPages.clickHamburgerMenuButton();
  await contactUsPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await contactUsPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await contactUsPage.expectScreenContactUsPage(testInfo);
});
