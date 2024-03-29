const { test, expect } = require("../../utils/fixtureApi");
const testData = JSON.parse(
  JSON.stringify(require("../../data/bots-protection-system/testData.json"))
);
test.describe.configure({ mode: "default" });
test("Brazilian Bots and Error 429 Page /web search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {
  // Action
  let response;
  for (let i = 1; i < 13; i++) {
  response = await searchRequest.sendGet("/v4/web/search",
    builder
    .setNonceHeader(testData.WebBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.WebBrazilianBots.XRequestSignature)
    .setQueryParam(`"Otras características considerar"`)
    .setOffsetParam(0)
    .setItemsCountParam(10)
    .setLocaleParam("de-DE")
    .setFreshnessParam("All")
    .setSpellcheckParam(true)
    .build()
  )}
   // Assert
   await searchResponse.expectResponseToHaveStatusCode(response, 429);
   await searchResponse.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});
test("Brazilian Bots and Error 429 Page /news search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {
  // Action
  const response = await searchRequest.sendGet("/news/search",
    builder
    .setNonceHeader(testData.ImageBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.ImageBrazilianBots.XRequestSignature)
    .setQueryParam(`"Otras características considerar"`)
    .setRegionParam("de-DE") 
    .setLanguageParam("de")
    .setItemsCountParam(10)                
    .setOffsetParam(0)
    .setFreshnessParam("All")
    .setSortOrderParam("Desc")
    .setSortByParam("Created")
    .build()
    ) 
   // Assert
   await searchResponse.expectResponseToHaveStatusCode(response, 429);
   await searchResponse.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Brazilian Bots and Error 429 Page /image search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {
  // Action
  const response = await searchRequest.sendGet("/v4/images/search",
    builder
    .setNonceHeader(testData.ImageBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.ImageBrazilianBots.XRequestSignature)
    .setQueryParam(`"Otras características considerar"`)                 
    .setOffsetParam(0)
    .setItemsCountParam(50)
    .setLocaleParam("uk-UA")
    .setSpellcheckParam(true)
    .build()
    ) 
   // Assert
   await searchResponse.expectResponseToHaveStatusCode(response, 429);
   await searchResponse.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Brazilian Bots and Error 429 Page /video search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {

  // Action
  const response = await searchRequest.sendGet("/v2/videos/search",
    builder
    .setNonceHeader(testData.VideoBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.VideoBrazilianBots.XRequestSignature)
    .setQueryParam(`"Otras características considerar"`)
    .setItemsCountParam(10)
    .setRegionParam("uk-UA")
    .setFreshnessParam("All")
    .build()
    ) 
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Brazilian Bots and Error 429 Page /shopping search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {
   // Action
  const response = await searchRequest.sendGet("/shopping/search",
    builder
    .setNonceHeader(testData.ShoppingBrazilianBots.XRequestNonce)
    .setSignatureHeader(testData.ShoppingBrazilianBots.XRequestSignature)
    .setQueryParam(`"Otras características considerar"`)
    .setOffsetParam(0)
    .setItemsCountParam(24)
    .setRegionParam("de-DE")
    .setSortParam("Popularity")
    .build() 
    ) 
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({ status: 429, }));
});

test("Brazilian Bots and Error 429 Page /music search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {
  // Action
  const response = await searchRequest.sendGet("/audio/search/tracks",
    builder
    .setNonceHeader(testData.MusicRateLimit.XRequestNonce)
    .setSignatureHeader(testData.MusicRateLimit.XRequestSignature)
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
  builder,
  searchRequest,
  searchResponse
}) => {

  // Action
  let response;
  for (let i = 0; i < 102; i++) {
  response = await searchRequest.sendGet("/v2/videos/search",
    builder
    .setNonceHeader(testData.VideoRateLimit.XRequestNonce)
    .setSignatureHeader(testData.VideoRateLimit.XRequestSignature)
    .setQueryParam("test")
    .setItemsCountParam(10)
    .setRegionParam("de-DE")
    .setFreshnessParam("All")
    .build()
    )}
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Check Queries Rate Limit for Regular Bot /web search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {
  // Action
  
  const response = await searchRequest.sendGet("/v4/web/search",
    builder
    .setNonceHeader(testData.WebRateLimit.XRequestNonce)
    .setSignatureHeader(testData.WebRateLimit.XRequestSignature)
    .setQueryParam("test")
    .setOffsetParam(0)
    .setItemsCountParam(10)
    .setLocaleParam("de-DE")
    .setFreshnessParam("All")
    .setSpellcheckParam(true)
    .build()
  )
   // Assert
   await searchResponse.expectResponseToHaveStatusCode(response, 429);
   await searchResponse.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});

test("Check Queries Rate Limit for Regular Bot /image search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {
  // Action
  const response = await  searchRequest.sendGet("/v4/images/search",
    builder
    .setNonceHeader(testData.ImageRateLimit.XRequestNonce)
    .setSignatureHeader(testData.ImageRateLimit.XRequestSignature)
    .setQueryParam("test")                 
    .setOffsetParam(0)
    .setItemsCountParam(50)
    .setLocaleParam("de-DE")
    .setSpellcheckParam(true)
    .build()
  ) 
   // Assert
   await searchResponse.expectResponseToHaveStatusCode(response, 429);
   await searchResponse.expectResponseToBeFalsy(response);
   await expect(response.json()).resolves.toEqual(expect.objectContaining({status: 429,}));
});
test("Check Queries Rate Limit for Regular Bot /shopping search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {
   // Action
  const response = await searchRequest.sendGet("/shopping/search",
    builder
    .setNonceHeader(testData.ShoppingRateLimit.XRequestNonce)
    .setSignatureHeader(testData.ShoppingRateLimit.XRequestSignature)
    .setQueryParam("test")
    .setOffsetParam(0)
    .setItemsCountParam(24)
    .setRegionParam("de-DE")
    .setSortParam("Popularity")
    .build()
    ) 
  // Assert
  await searchResponse.expectResponseToHaveStatusCode(response, 429);
  await searchResponse.expectResponseToBeFalsy(response);
  await expect(response.json()).resolves.toEqual(expect.objectContaining({ status: 429, }));
});

test("Check Queries Rate Limit for Regular Bot /music search @api", async ({
  builder,
  searchRequest,
  searchResponse
}) => {
   // Action
   const response = await searchRequest.sendGet("/audio/search/tracks",
    builder
    .setNonceHeader(testData.MusicRateLimit.XRequestNonce)
    .setSignatureHeader(testData.MusicRateLimit.XRequestSignature)
    .setQueryParam("test")
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