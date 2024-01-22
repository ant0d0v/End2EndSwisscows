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
    searchBuilder
    .setNonceHeader(testData.WebBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.WebBrazilianBots.XRequestNonce)
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
    searchBuilder
    .setNonceHeader(testData.ImageBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.ImageBrazilianBots.XRequestSignature)
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
    searchBuilder
    .setNonceHeader(testData.VideoBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.VideoBrazilianBots.XRequestSignature)
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
    searchBuilder
    .setNonceHeader(testData.ShoppingBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.ShoppingBrazilianBots.XRequestSignature)
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
    searchBuilder
    .setNonceHeader(testData.MusicBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.MusicBrazilianBots.XRequestSignature)
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

test("Check Queries Rate Limit for Regular Bot /video search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {

  // Action
  let response;
  for (let i = 0; i < 101; i++) {
  response = await searchRequest.sendVideoRequestMethodGet(
    searchBuilder
    .setNonceHeader(testData.VideoRateLimit.XRequestNonce)
    .setSignatureHeader(testData.VideoRateLimit.XRequestSignature)
    .setQueryParam("test")
    .setItemsCountParam(10)
    .setRegionParam("uk-UA")
    .build()
    )}
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Check Queries Rate Limit for Regular Bot /web search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
  // Action
  
  const response = await searchRequest.sendWebRequestMethodGet(
    searchBuilder
    .setNonceHeader(testData.WebRateLimit.XRequestNonce)
    .setSignatureHeader( testData.WebRateLimit.XRequestSignature)
    .setQueryParam("good")
    .setOffsetParam(0)
    .setItemsCountParam(10)
    .setFreshnessParam("All")
    .setRegionParam("uk-UA")
    .build()
  )
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
    searchBuilder
    .setNonceHeader(testData.ImageRateLimit.XRequestNonce)
    .setSignatureHeader(testData.ImageRateLimit.XRequestSignature)
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
test("Check Queries Rate Limit for Regular Bot /shopping search @api", async ({
  searchBuilder,
  searchRequest,
  searchResponse
}) => {
   // Action
  const response = await searchRequest.sendShoppingRequestMethodGet(
    searchBuilder
    .setNonceHeader(testData.ShoppingRateLimit.XRequestNonce)
    .setSignatureHeader(testData.ShoppingRateLimit.XRequestSignature)
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
    searchBuilder
    .setNonceHeader(testData.MusicRateLimit.XRequestNonce)
    .setSignatureHeader(testData.MusicRateLimit.XRequestSignature)
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