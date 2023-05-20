import { expect, Page } from "@playwright/test";
import { CreateJobAlerts } from "@webObjects/CreateJobAlerts";
import { CommonWebActions } from "@commonWebActions/CommonWebActions";


let commonWebActions: CommonWebActions;

export class CreateJobAlertsPage extends CreateJobAlerts {
    page:Page

    constructor( page: Page) {
        super();
        this.page = page;
        commonWebActions = new CommonWebActions(this.page);
    }

async createJobAlerts(jobName:string,city:string,): Promise<void> {
        await commonWebActions.clickElementJS(CreateJobAlertsPage.job_AlertsLink);
        await this.page.waitForLoadState();
        await commonWebActions.clickElement(CreateJobAlertsPage.Create_Job_Alert);
        await commonWebActions.clickElement(CreateJobAlertsPage.Create_Job_Alert);
        await this.page.waitForLoadState();
        await commonWebActions.keyboardPress('Enter');
        await this.page.waitForLoadState();
        await commonWebActions.enterElementText(CreateJobAlertsPage.JobAlertName, jobName);
        await commonWebActions.selectOptionClick(CreateJobAlertsPage.clickobAlertFrqDropDown, CreateJobAlertsPage.JobAlertFrequency);
        await commonWebActions.getByLabelClick(CreateJobAlertsPage.clickJobLocation);
        await commonWebActions.enterElementText(CreateJobAlertsPage.enterJobLocation, city);
        await commonWebActions.getByLabelClick(CreateJobAlertsPage.jobTypeDropDown);
        await commonWebActions.clickElement(CreateJobAlertsPage.jobTypeName);
        await commonWebActions.getByLabelClick(CreateJobAlertsPage.fullParttimeDropDown);
        await commonWebActions.clickElement(CreateJobAlertsPage.fullParttimeSelection);
        await commonWebActions.keyboardPress('Tab');
        await commonWebActions.clickElement(CreateJobAlertsPage.clickOkBtn);
        await expect(this.page).toHaveTitle('Manage Job Alerts');
    }
}


