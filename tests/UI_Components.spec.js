import { test, expect } from '@playwright/test';
import { sign } from 'node:crypto';
test('radio_Buttons', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const Blink = page.locator(".blinkingText");
    const userName = page.locator('#username');
    const passWord = page.locator('#password');
    const radioBtn = page.locator("//input[@id='usertype']");
    const dropDown = page.locator("select.form-control");
    const Terms = page.locator("//input[@id='terms']");
    const signIn = page.locator("//input[@value='Sign In']");
    const Okay = page.locator("#okayBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect((Blink).first()).toHaveAttribute('class', 'blinkingText'); //checking for the blinking text
    const blinkingText = await page.locator(".blinkingText").nth(0).textContent();
    console.log(blinkingText);
    await userName.fill("rahulshettyacademy");
    await passWord.fill("Learning@830$3mK2");
    await radioBtn.last().click();
    await Okay.click();
    await expect((radioBtn).last()).toBeChecked();
    await dropDown.selectOption("consult");
    await Terms.click();
    await signIn.click();
    //Assertions
    await expect(Terms).toBeChecked();   // assertion (test validation)
    console.log(await Terms.isChecked());
})
test('Child_window', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const Blink = page.locator('.blinkingText');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const BlinkText = await page.locator('.blinkingText').nth(0).textContent()
    await console.log(BlinkText)
    // console.log(await page.locator('.blinkingText')).nth(0).textContent();
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), Blink.nth(0).click(),
        ])
    const newText = await newPage.locator('.red').textContent();
    await console.log(newText);

})
test.only('text_content_inputValue', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username')
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill('sravanthi');
    await userName.fill('sravanthi');
    //console.log(await userName.textContent());
    console.log(await userName.inputValue());
})