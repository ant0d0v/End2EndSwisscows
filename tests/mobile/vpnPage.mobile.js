import { test, expect } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/vpn-page/testData.json"))
);
test("Check design of the VPN page ", async ({ vpnPage },testInfo) => {
    //Actions
    await vpnPage.waitUntilPageIsFullyLoaded();
    //Assert
    await vpnPage.expectScreenVpnPage(testInfo)
  });
  
  test("Check design dark theme of the  VPN page ", async ({
    vpnPage
  },testInfo) => {
    //Actions
    await vpnPage.waitUntilPageIsFullyLoaded();
    await vpnPage.headerStaticPages.clickHamburgerMenuButton();
    await vpnPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
    await vpnPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();
  
    //Assert
    await vpnPage.expectScreenVpnPage(testInfo)
  });

  test("Check that all questions were opened on the VPN page.", async ({
    vpnPage
  }) => {
    //Actions
    await vpnPage.scrollDownToQuestions()
    await vpnPage.clickAllQuestions();
  
    //Assert
    await vpnPage.expectQuestionsAreOpened();
  });
  
  test("Check that a question and answer can be opened and closed on the VPN page.", async ({
    vpnPage,
  }) => {
    //Actions
    await vpnPage.scrollDownToQuestions()
    await vpnPage.clickAllQuestions();
    await vpnPage.expectQuestionsAreOpened();
    await vpnPage.clickAllQuestions();
    
    //Assert
    await vpnPage.expectQuestionsAreClosed();
  });
 
  test("Check that buttons have hover effect on vpn page", async ({ vpnPage }) => {

    // Assert
    await vpnPage.expectColorsLinksWhenHovering(vpnPage.allButtons, "background", 
    "rgb(0, 93, 119) none repeat scroll 0% 0% / auto padding-box border-box");
  });