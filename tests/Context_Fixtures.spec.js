import { test } from '@playwright/test';

test('Using Context', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/');
});

test('eliminating context', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/');
});

test('without browser', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/');
});