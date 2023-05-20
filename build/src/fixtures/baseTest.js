"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("@pages/LoginPage");
const test = test_1.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage_1.LoginPage(page));
    },
});
exports.default = test;
//# sourceMappingURL=baseTest.js.map