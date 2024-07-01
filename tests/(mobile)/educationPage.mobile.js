import { test } from "../../utils/fixtures.js";
test("Check design of the Education page ", async ({ app }, testInfo) => {
  //Actions
  await app.mediaEducationPage.open();
  //Assert
  await app.mediaEducationPage.expectScreenMediaEducationPage(testInfo);
});

test("Check color of flyer button when hovering ", async ({ app }) => {
  //Actions
  await app.mediaEducationPage.open();
  //Assert
  await app.mediaEducationPage.expectColorLinkWhenHovering(
    app.mediaEducationPage.flyerButton,
    "background",
    /rgb\(191, 0, 0\)/
  );
});

test("Check design dark theme of the Education page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.mediaEducationPage.open();
  await app.mediaEducationPage.header.clickHamburgerMenuButton();
  await app.mediaEducationPage.header.hamburgerMenu.clickThemeDropdown();
  await app.mediaEducationPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.mediaEducationPage.expectScreenMediaEducationPage(testInfo);
});
