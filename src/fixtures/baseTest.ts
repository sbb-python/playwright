import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CreateJobAlertsPage } from '@pages/CreateJobAlertsPage';

const test = baseTest.extend<{
    loginPage: LoginPage;
    createJobAlertsPage: CreateJobAlertsPage;


}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    createJobAlertsPage: async ({ page }, use) => {
        await use(new CreateJobAlertsPage(page));

    },
});

export default test;