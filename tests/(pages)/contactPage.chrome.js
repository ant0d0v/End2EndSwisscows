import { test } from "../../utils/fixtures.js";
import testData from "../../data/pages/contact/testData.json"
import constantsData from "../../data/project-constants/testData.json"

test("Check color of Send button when hovering ", async ({ app }) => {
  //Actions
  await app.contactPage.open();
  //Assert
  await app.contactPage.expectColorLinkWhenHovering(
    app.contactPage.sendButton,
    "background",
    /rgb\(191, 0, 0\)/
  );
});

test.skip(`Check border color of name, email, message when sending form with empty fields`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.clickSendButton();
  //Assert
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[0].yourName,
    testData.formFields[0].redColor
  );
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[1].email,
    testData.formFields[1].redColor
  );
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[2].yourMessage,
    testData.formFields[2].redColor
  );
});

test.skip(`Check border color of name, email, message when sending form with name only`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.inputYouNameField("Test");
  await app.contactPage.clickSendButton();

  //Assert
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[0].yourName,
    testData.formFields[0].greyColor
  );
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[1].email,
    testData.formFields[1].redColor
  );
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[2].yourMessage,
    testData.formFields[2].redColor
  );
});

test.skip(`Check border color of name, email, message when sending form with email only`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.inputEmailField("test@gmail.com");
  await app.contactPage.clickSendButton();

  //Assert
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[0].yourName,
    testData.formFields[0].redColor
  );
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[1].email,
    testData.formFields[1].greyColor
  );
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[2].yourMessage,
    testData.formFields[2].redColor
  );
});

test.skip(`Check border color of name, email, message when sending form with message only`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.inputMessageField(
    "Check form using automation testing using playwright"
  );
  await app.contactPage.clickSendButton();

  //Assert
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[0].yourName,
    testData.formFields[0].redColor
  );
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[1].email,
    testData.formFields[1].redColor
  );
  await app.contactPage.expectBorderColorFormField(
    testData.formFields[2].yourMessage,
    testData.formFields[2].greyColor
  );
});

test(`Check send message using all required fields`, async ({ app }) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.inputYouNameField("Test");
  await app.contactPage.inputEmailField("test@gmail.com");
  await app.contactPage.inputMessageField("My test");
  await app.contactPage.checkAgreeCheckbox();
  await app.contactPage.clickSendButton();

  //Assert
  await app.contactPage.expectSuccessMessage();
  await app.expectHaveUrl(
    app.page,
    "https://dev.swisscows.com/en/contact?success=true"
  );
});

test(`Check "back to search" button `, async ({ app }) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.inputYouNameField("Test");
  await app.contactPage.inputEmailField("test@gmail.com");
  await app.contactPage.inputMessageField("My test");
  await app.contactPage.checkAgreeCheckbox();
  await app.contactPage.clickSendButton();
  await app.contactPage.clickBackToSearchButton();

  //Assert
  await app.expectHaveUrl(app.page, constantsData.URL_MAIN_PAGE);
  await app.expectHaveTitle(app.page, constantsData.TITLE_MAIN_PAGE);
});

test(`Check the tooltip when sending a message without the "Agree" checkbox`, async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.inputYouNameField("Test");
  await app.contactPage.inputEmailField("test@gmail.com");
  await app.contactPage.inputMessageField("My test");
  await app.contactPage.clickSendButton();

  //Assert
  await app.contactPage.expectAgreeCheckboxToHaveProperty(
    "Please check this box if you want to proceed."
  );
});

test(`Check color of "back to search" when hovering `, async ({ app }) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.inputYouNameField("Test");
  await app.contactPage.inputEmailField("test@gmail.com");
  await app.contactPage.inputMessageField("My test");
  await app.contactPage.checkAgreeCheckbox();
  await app.contactPage.clickSendButton();

  //Assert
  await app.contactPage.expectColorLinkWhenHovering(
    app.contactPage.backToSearchButton,
    "background",
    /rgb\(191, 0, 0\)/
  );
});

test("Check navigation to corresponding pages for  privacy link on the page", async ({
  app,
}) => {
  //Actions
  await app.contactPage.open();
  const currentPage = await app.contactPage.clickElementAndNavigateToNewPage(
    app.contactPage.privacyLink
  );

  //Assert
  await app.expectHaveUrl(currentPage, constantsData.URL_PRIVACY_POLICY);
  await app.expectHaveTitle(currentPage, constantsData.TITLE_PRIVACY_POLICY);
});

test("Check design of the Contact Us page ", async ({ app }, testInfo) => {
  //Actions
  await app.contactPage.open();
  //Assert
  await app.contactPage.expectScreenContactPage(testInfo);
});

test("Check design dark theme of the  Contact Us page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.contactPage.open();
  await app.contactPage.header.clickHamburgerMenuButton();
  await app.contactPage.header.hamburgerMenu.clickThemeDropdown();
  await app.contactPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.contactPage.expectScreenContactPage(testInfo);
});
