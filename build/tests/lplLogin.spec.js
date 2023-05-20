"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseTest_1 = __importDefault(require("@fixtures/baseTest"));
baseTest_1.default.only("@LPL Thes page loads", async ({ loginPage, page }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    //await page.pause();
});
//# sourceMappingURL=lplLogin.spec.js.map