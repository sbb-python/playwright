"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // Expect a title "to contain" a substring.
    await (0, test_1.expect)(page).toHaveTitle(/Playwright/);
});
(0, test_1.test)('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
    // Expects the URL to contain intro.
    await (0, test_1.expect)(page).toHaveURL(/.*intro/);
});
//# sourceMappingURL=example.spec.js.map