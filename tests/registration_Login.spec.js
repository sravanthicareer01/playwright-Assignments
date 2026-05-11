import { test, expect } from '@playwright/test';
test('Registration', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const Email = page.locator("//input[@id='userEmail']");
    const Mobile = page.locator("#userMobile");
    const Gender = page.locator("//input[@value='Female']");
    const password = page.locator("//input[@id='userPassword']");
    const confirmPassword = page.locator("//input[@id='confirmPassword']");
    const age18 = page.locator("//input[@type='checkbox']");
    const register = page.locator("//input[@value='Register']");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    await firstName.fill("sravanthi11");
    await lastName.fill("chilakapati11");
    await Email.fill("Buddi1@gmail.com");
    await Mobile.fill("9898989899");
    await Gender.check();
    await password.fill("Myfirstjob@124");
    await confirmPassword.fill("Myfirstjob@124");
    await age18.check();
    await register.click();
    await page.waitForTimeout(3000);


});

test.only('Login', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.locator(".login-title").textContent());
    await page.locator("#userEmail").fill("Buddi1@gmail.com");
    await page.locator("#userPassword").fill("Myfirstjob@124");
    await page.locator("#login").click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle("Let's Shop");
    console.log(await page.locator(".card-body b").first().textContent());
    await page.waitForTimeout(3000);




});