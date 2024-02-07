import { test } from "../../../utils/fixturePages";

test("Check 202 No Results Found error page ", async ({
    mainPage,
    webPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.clickHamburgerMenuButton();
    await mainPage.headerStaticPages.hamburgerMenu.selectRegion("Ukraine");
    await mainPage.headerStaticPages.searchForm.inputSearchCriteria("@#@$%^$^dasdsad1231");
    await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
    
    //Assert
    await webPage.expectElementToHaveText(webPage.error.contentErrorNoResults, "No results found for \"@#@$%^$^dasdsad1231\"SearchTips:Ensure words are spelled correctly.Try rephrasing keywords or using synonyms.Try less specific keywords.Make your queries as concise as possible.")
    await webPage.expectElementToBeVisible(webPage.error.errorImage)
  });

  test("Check request is blocked 450 error page ", async ({
    mainPage,
    webPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.searchForm.inputSearchCriteria("porn");
    await mainPage.headerStaticPages.searchForm.clickEnterSearchField();
    //Assert
    await webPage.expectElementToHaveText(webPage.error.contentErrorNoResults, "No results found for \"porn\"Error 450: BlockedDear user, search results for the query \"porn\" may contain violence and pornography. Since we have decided on the protection of minors, the search for this query is disabled.Thank you very much for your understanding!")
    await webPage.expectElementToBeVisible(webPage.error.errorImage)
  });

  test("Check 500 unknown Error Page  ", async ({
    webPage
  }) => {
    //Actions
    await webPage.error.open500Page("/web")
    //Assert
    await webPage.expectElementToHaveText(webPage.error.contentErrorPage, "Oops! Something is wrongError 500: Internal Server ErrorServer doesn’t respond or something else happened. Please, try to refresh this page.")
    await webPage.expectElementToBeVisible(webPage.error.errorImage)
  });

  test("Check 404 Page Not Found ", async ({
    webPage
  }) => {
    //Actions
    await webPage.error.open404Page()
    //Assert
    await webPage.expectElementToHaveText(webPage.error.contentErrorPage, "Page not foundError 404: Not FoundThis error means: URL you've requested hasn't been found on server. Please check the URL you've pointed. You may wish to go to the start page of the site.")
  });
