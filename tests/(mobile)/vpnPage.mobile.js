import { test, expect } from "../../utils/fixturePages";

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
    await vpnPage.header.clickHamburgerMenuButton();
    await vpnPage.header.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
    await vpnPage.header.hamburgerMenu.clickDarkInHamburgerMenu();
  
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
    await vpnPage.faq.expectQuestionsAreOpened();
  });
  
  test("Check that a question and answer can be opened and closed on the VPN page.", async ({
    vpnPage,
  }) => {
    //Actions
    await vpnPage.scrollDownToQuestions()
    await vpnPage.clickAllQuestions();
    await vpnPage.faq.expectQuestionsAreOpened();
    await vpnPage.clickAllQuestions();
    
    //Assert
    await vpnPage.faq.expectQuestionsAreClosed();
  });
 
  test("Check that buttons have hover effect on vpn page", async ({ vpnPage }) => {

    // Assert
    await vpnPage.expectColorsLinksWhenHovering(vpnPage.allButtons, "background", 
    "rgb(0, 93, 119) none repeat scroll 0% 0% / auto padding-box border-box");
  });