const { test, expect } = require('@playwright/test');

test('hidden_Text', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();// hidden text should be visible before clicking on hide button
    await page.locator('#hide-textbox').click(); // click on hide button
    await expect(page.locator('#displayed-text')).toBeHidden();// hidden text should be hidden after clicking on hide button
    await page.locator('#show-textbox').click(); // click on show button
    await expect(page.locator('#displayed-text')).toBeVisible(); // after clicking show button the hidden text should show
    await console.log("Hidden_show_Button_Tested_Successfully");
});
test('Navigators', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack(); // back arrow
    await page.goForward();// forward arrow
    await console.log("Navigations_works_as_Expected");
})