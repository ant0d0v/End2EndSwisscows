// import { test, expect } from "../../utils/fixtures.js";
// import testData from "../../data/bots-protection-system/testData.json";

// test("Check response /web search @api", async ({
//   app,
// }) => {
//   // Action
//   const response = await app.api.search.sendGet(
//     "/v4/web/search",
//     app.api.search.webSearchApiRequest
//       .setNonceHeader(testData.WebRateLimit.XRequestNonce)
//       .setSignatureHeader(testData.WebRateLimit.XRequestSignature)
//       .setQuery("test")
//       .setOffset(0)
//       .setCount(10)
//       .setLocale("de-DE")
//       .setFreshness("All")
//       .setSpellcheck(true)
//   );
//   // Assert
//   await app.api.search.response.expectResponseToBeOk(response);
//   await app.api.search.response.expectBodyNotToBeNull(response);
//   const responseBody = await response.json();
//   responseBody.items.hasPart.forEach((item) => {
//     expect(item).toHaveProperty("name");
//   });
// });
