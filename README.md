# End2End Swisscows Web (JavaScript + Playwright)

**How to run test ?**

1. Clone repository to your machine.

2. Navigate to project root folder.

3. Run command ```npm ci``` in terminal VScode.
   
4. Install Playwright Browsers, run command ```npx playwright install --with-deps``` in terminal VScode.

5. Run command ```QASE_REPORT=1 QASE_RUN_NAME=UI npx playwright test --project chromium firefox edge mobile  --headed ; QASE_REPORT=1 QASE_RUN_NAME=API npx playwright test api``` in terminal VScode  to run tests.
