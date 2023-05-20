
import {expect, test } from "@playwright/test"
import * as dotenv from 'dotenv' 
dotenv.config()


test("Thes page loads", async ({ page,baseURL }) => {
  
    await page.goto(baseURL + '/login');
    const title = await page.title();
    console.log(title)
    expect(page).toHaveTitle('Workday');
    console.log('Assertion Passed');
    await page.pause();
   await Promise.all([
        page.waitForLoadState(undefined),
        page.click('a[target=_blank]'),
      ]);

   
})

