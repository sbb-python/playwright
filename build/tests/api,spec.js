"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const REPO = 'test-repo-1';
const USER = 'github-username';
// Request context is reused by all tests in the file.
let apiContext;
test_1.test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // We set this header per GitHub guidelines.
            'Accept': 'application/vnd.github.v3+json',
            // Add authorization token to all requests.
            // Assuming personal access token available in the environment.
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
});
test_1.test.afterAll(async ({}) => {
    // Dispose all responses.
    await apiContext.dispose();
});
(0, test_1.test)('last created issue should be first in the list', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] request 1',
        }
    });
    (0, test_1.expect)(newIssue.ok()).toBeTruthy();
    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
    await (0, test_1.expect)(firstIssue).toHaveText('[Feature] request 1');
});
//# sourceMappingURL=api,spec.js.map