import { test, expect } from '@playwright/test';

test('@temp', async ({ page }) => {
  await page.goto('https://twitter.com/messages');

  await page.pause();


});

