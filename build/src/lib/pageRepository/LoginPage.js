"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const LoginPageObjects_1 = require("@webObjects/LoginPageObjects");
const CommonWebActions_1 = require("@commonWebActions/CommonWebActions");
const EnvConfig_1 = require("../../../config/EnvConfig");
let commonWebActions;
class LoginPage extends LoginPageObjects_1.LoginPageObjects {
    page;
    constructor(page) {
        super();
        this.page = page;
        commonWebActions = new CommonWebActions_1.CommonWebActions(this.page);
    }
    async navigateToURL() {
        await commonWebActions.navigateToURL(EnvConfig_1.EnvConfig.SIT + '/login');
    }
    async loginToApplication() {
        const decipherPassword = await commonWebActions.decipherPassword();
        await commonWebActions.enterElementText(LoginPageObjects_1.LoginPageObjects.userName, EnvConfig_1.EnvConfig.username);
        await commonWebActions.enterElementText(LoginPageObjects_1.LoginPageObjects.passWord, decipherPassword);
        await commonWebActions.keyboardPress('Tab');
        await commonWebActions.keyboardPress('Enter');
        //await commonWebActions.clickElementJS(LoginPageObjects.signonBtn);
        await this.page.waitForLoadState();
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map