const { expect: baseExpect, test } = require('@playwright/test');

exports.test = test; // Re-export 'test' for convenience

exports.expect = baseExpect.extend({
  opensNewPage: async function (locator, expected, options) {
    const assertionName = 'opensNewPage';
    let pass = false;
    let actualURL = '';
    try {
        // Wait for the next page to be created in the context
        const [newPage] = await Promise.all([
            locator.page().context().waitForEvent('page'), // Waits for the next page to be created
            locator.click(), // Triggers the action that leads to the new page
        ]);

        actualURL = newPage.url(); // Get the URL of the new page
        await newPage.waitForLoadState('load', options); // Wait for the new page to load, optionally with timeout
        const urlMatch = new RegExp(expected).test(actualURL); // Test if the actual URL matches the expected pattern

        pass = urlMatch; // Set pass based on the URL match
    } catch (e) {
      matcherResult = { actual: actualURL };
      pass = false;
    }

    const message = pass
      ? () => `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
              `Locator: ${locator}\n` +
              `Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(expected)}\n` +
              `Received: ${this.utils.printReceived(actualURL)}`
      : () => `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
              `Locator: ${locator}\n` +
              `Expected: ${this.utils.printExpected(expected)}\n` +
              `Received: ${this.utils.printReceived(actualURL)}`;

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: actualURL,
    };
  },
  toHaveColorsWhenHovering: async function (locator, color ,expected, options) {
    const assertionName = 'toHaveColorsWhenHovering';
    let pass;
    let matcherResult;
    try {
      const elements = await locator.all();
      for (const element of elements) {
        await element.hover(options);
        await baseExpect(element).toHaveCSS(color, expected, options);
      }
      pass = true
    } catch (e) {
      matcherResult = e.matcherResult;
        pass = false;
     }

     const message = pass
     ? () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
         '\n\n' +
         `Locator: ${locator}\n` +
         `Expected: ${this.isNot ? 'not' : ''}${this.utils.printExpected(expected)}\n` +
         (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '')
     : () =>  this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
         '\n\n' +
         `Locator: ${locator}\n` +
         `Expected: ${this.utils.printExpected(expected)}\n` +
         (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '');

   return {
     message,
     pass,
     name: assertionName,
     expected,
     actual: matcherResult?.actual,
   };
 },
});
