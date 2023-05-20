import test from "@fixtures/baseTest";

test.describe.only('This Test case only created for demo purposes', () => {

test("@LPL Test Case to create LPL Job Alert-AVP", async ({ loginPage, createJobAlertsPage, page }) => {

    await test.step("Navigate and Login to LPL WorkDay Site with valid credentials", async () => {

        await loginPage.navigateToURL();
        await page.waitForLoadState('networkidle');
        await loginPage.loginToApplication();
    });
    await test.step("This function creates Job Alert base on provided data", async () => {
        
        await createJobAlertsPage.createJobAlerts('AVP','AUSTIN,TX');
    });


});

});


