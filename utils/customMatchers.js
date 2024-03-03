const { expect: baseExpect, test } = require('@playwright/test');

exports.test = test; // Re-export 'test' for convenience

exports.expect = baseExpect.extend({
  toBeOpenedNewPage: async function (locator, expected, options) {
    const assertionName = 'opensNewPage';
    let pass;
    let matcherResult;
    try {
        // Wait for the next page to be created in the context
        const pagePromise = locator.page().context().waitForEvent('page')
        await locator.click()
        const newPage = await pagePromise 
        await newPage.waitForLoadState('load', options); 
        await baseExpect(newPage).toHaveURL(new RegExp(expected),options); 
        pass = true; 
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
 newPageNoToHaveURL: async function (locator, expected, options) {
  const assertionName = 'opensNewPage';
  let pass;
  let matcherResult;
  try {
      // Wait for the next page to be created in the context
      const pagePromise = locator.page().context().waitForEvent('page')
      await locator.click()
      const newPage = await pagePromise 
      await newPage.waitForLoadState('load', options); 
      await baseExpect(newPage).not.toHaveURL(new RegExp(expected),options); 
      pass = true; 
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
