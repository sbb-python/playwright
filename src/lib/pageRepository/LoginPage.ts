import { Page } from "@playwright/test";
import { LoginPageObjects } from "@webObjects/LoginPageObjects";
import { CommonWebActions } from "@commonWebActions/CommonWebActions";
import { EnvConfig } from '../../../config/EnvConfig'

let commonWebActions: CommonWebActions;

export class LoginPage extends LoginPageObjects {
    constructor(private page: Page) {
        super();
        commonWebActions = new CommonWebActions(this.page);
    }

    async navigateToURL(): Promise<void> {
        await commonWebActions.navigateToURL(EnvConfig.SIT + '/login');
    }
    async loginToApplication(): Promise<void> {
        const decipherPassword = await commonWebActions.decipherPassword();
        await commonWebActions.enterElementText(LoginPageObjects.userName, EnvConfig.username);
        await commonWebActions.enterElementText(LoginPageObjects.passWord, decipherPassword);
        await commonWebActions.clickElement(LoginPageObjects.passWord);
        await commonWebActions.keyboardPress('Enter');
        await commonWebActions.keyboardPress('Tab');
        await commonWebActions.keyboardPress('Enter');
        await this.page.waitForLoadState();
        await commonWebActions.clickElement(LoginPageObjects.welcome_Msg);
        await this.page.waitForLoadState();
       
    }
}


