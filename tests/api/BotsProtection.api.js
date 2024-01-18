const { test, expect } = require("../../utils/fixtureApi");
const testData = JSON.parse(
  JSON.stringify(require("../../data/bots-protection-system/testData.json"))
);
test.describe.configure({ mode: "default" });
test("Brazilian Bots and Error 429 Page /web search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
  // Action
  let response;
  for (let i = 1; i < 13; i++) {
  response = await searchRequest.sendWebRequestMethodGet(
    searchBuilder.setHeaders(
      testData.WebSearchRequestBrazilianBots.XRequestNonce,
      testData.WebSearchRequestBrazilianBots.XRequestSignature,
      )
      .setQueryParam(`"Otras características considerar"`)
      .setOffsetParam(0)
      .setItemsCountParam(10)
      .setFreshnessParam("All")
      .setRegionParam("uk-UA")
      .build()
  )}
   // Assert
   await searchResponse.expectResponseToHaveStatusCode(response, 429);
   await searchResponse.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Brazilian Bots and Error 429 Page /image search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
  // Action
  const response = await  searchRequest.sendImagesRequestMethodGet(
    searchBuilder.setHeaders(
      testData.ImageSearchRequestBrazilianBots.XRequestNonce,
      testData.ImageSearchRequestBrazilianBots.XRequestSignature,
      )
      .setQueryParam(`"Otras características considerar"`)                 
      .setOffsetParam(0)
      .setItemsCountParam(50)
      .setRegionParam("uk-UA")
      .setFreshnessParam("All")
      .setAspectParam("All")
      .setSizeParam("All")
      .setColorParam("All")
      .setTypeParam("All")
      .setContentParam("All")
      .setLicenseParam("All")
      .build() 
  ) 
   // Assert
   await searchResponse.expectResponseToHaveStatusCode(response, 429);
   await searchResponse.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Brazilian Bots and Error 429 Page /video search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {

  // Action
  const response = await searchRequest.sendVideoRequestMethodGet(
    searchBuilder.setHeaders(
      testData.VideoSearchRequestBrazilianBots.XRequestNonce,
      testData.VideoSearchRequestBrazilianBots.XRequestSignature,
      )
      .setQueryParam(`"Otras características considerar"`)
      .setItemsCountParam(10)
      .setRegionParam("uk-UA")
      .build()
      ) 
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Brazilian Bots and Error 429 Page /shopping search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
   // Action
  const response = await searchRequest.sendShoppingRequestMethodGet(
    searchBuilder.setHeaders(
      testData.ShoppingSearchRequestBrazilianBots.XRequestNonce,
      testData.ShoppingSearchRequestBrazilianBots.XRequestSignature
      )
      .setQueryParam(`"Otras características considerar"`)
      .setOffsetParam(0)
      .setItemsCountParam(24)
      .setSortParam("Popularity")
      .setRegionParam("de-DE")
      .build()
      ) 
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({ status: 429, }));
});

test("Brazilian Bots and Error 429 Page /music search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
  // Action
  const response = await searchRequest.sendMusicRequestMethodGet(
    searchBuilder.setHeaders(
        testData.MusicSearchRequestBrazilianBots.XRequestNonce,
        testData.MusicSearchRequestBrazilianBots.XRequestSignature
      )
      .setQueryParam(`"Otras características considerar"`)
      .setOffsetParam(0)
      .setItemsCountParam(20)
      .setRegionParam("de-DE")
      .build()
  );
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({ status: 429, }));
});

test("Check Queries Rate Limit for Regular Bot /web search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
  // Action
  let response;
  for (let i = 1; i < 115; i++) {
  response = await searchRequest.sendWebRequestMethodGet(
    searchBuilder.setHeaders(
      testData.WebSearchRequestRateLimit.XRequestNonce,
      testData.WebSearchRequestRateLimit.XRequestSignature,
      )
      .setQueryParam("good")
      .setOffsetParam(0)
      .setItemsCountParam(10)
      .setFreshnessParam("All")
      .setRegionParam("uk-UA")
      .build()
  )}
   // Assert
   await searchResponse.expectResponseToHaveStatusCode(response, 429);
   await searchResponse.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Check Queries Rate Limit for Regular Bot /image search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
  // Action
  const response = await  searchRequest.sendImagesRequestMethodGet(
    searchBuilder.setHeaders(
      testData.ImageSearchRequestRateLimit.XRequestNonce,
      testData.ImageSearchRequestRateLimit.XRequestSignature,
      )
      .setQueryParam("test")                 
      .setOffsetParam(0)
      .setItemsCountParam(50)
      .setRegionParam("uk-UA")
      .setFreshnessParam("All")
      .setAspectParam("All")
      .setSizeParam("All")
      .setColorParam("All")
      .setTypeParam("All")
      .setContentParam("All")
      .setLicenseParam("All")
      .build() 
  ) 
   // Assert
   await searchResponse.expectResponseToHaveStatusCode(response, 429);
   await searchResponse.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Check Queries Rate Limit for Regular Bot /video search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {

  // Action
  const response = await searchRequest.sendVideoRequestMethodGet(
    searchBuilder.setHeaders(
      testData.VideoSearchRequestRateLimit.XRequestNonce,
      testData.VideoSearchRequestRateLimit.XRequestSignature,
      )
      .setQueryParam("test")
      .setItemsCountParam(10)
      .setRegionParam("uk-UA")
      .build()
      ) 
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Check Queries Rate Limit for Regular Bot /shopping search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
   // Action
  const response = await searchRequest.sendShoppingRequestMethodGet(
    searchBuilder.setHeaders(
      testData.ShoppingSearchRequestRateLimit.XRequestNonce,
      testData.ShoppingSearchRequestRateLimit.XRequestSignature
      )
      .setQueryParam("ivanka")
      .setOffsetParam(0)
      .setItemsCountParam(24)
      .setSortParam("Popularity")
      .setRegionParam("de-DE")
      .build()
      ) 
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({ status: 429, }));
});

test("Check Queries Rate Limit for Regular Bot /music search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
   // Action
   const response = await searchRequest.sendMusicRequestMethodGet(
    searchBuilder.setHeaders(
        testData.MusicSearchRequestRateLimit.XRequestNonce,
        testData.MusicSearchRequestRateLimit.XRequestSignature
      )
      .setQueryParam("best")
      .setOffsetParam(0)
      .setItemsCountParam(20)
      .setRegionParam("de-DE")
      .build()
  );
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({ status: 429, }));
 
});