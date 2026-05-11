//import { test, expect } from '@playwright/test';
//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

test('Client_APP_E2E_FLOW', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const product = 'ZARA COAT 3';
    const email = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const allTiltles = page.locator('.card-body')
    const login = page.locator('#login');
    const coupon = page.locator("//input[@name='coupon']");
    await page.goto("https://rahulshettyacademy.com/client/");
    await email.fill('Buddi1@gmail.com');
    await password.fill('Myfirstjob@124');
    await login.click();
    // waiting to load dashboard
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    // Select product dynamically from dash board and add to the cart
    const AllContents = await allTiltles.allTextContents();
    await console.log(AllContents);
    const count = await allTiltles.count();
    for (let i = 0; i < count; ++i) {
        if (await allTiltles.nth(i).locator("b").textContent() === product) // restrict the scope from page to dash board items
        {
            await allTiltles.nth(i).locator("text=Add To Cart").click(); //
            break;
        }
    }
    // Click on "cart" check the product we added present in cart or not.
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();// wait to load f irst element in list
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();


    await page.locator("//button[@type='button']").last().click(); // we can use buttons type
    //await page.locator("text=Checkout").click() // we can use text based also
    // payment details are pending, we have to complete, still we can proceed since its not amandatory fro now
    // Shipping information
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
    const dropDown = page.locator(".ta-results ");
    await dropDown.waitFor();
    const options = dropDown.locator(".ta-item");
    const optionsCount = await dropDown.locator(".ta-item").count();
    await console.log(optionsCount);
    for (let i = 0; i < optionsCount; ++i) {
        const text = await options.nth(i).textContent();
        await console.log(text);
        if (text.trim() === "India") {
            await options.nth(i).click();
            break; //After desired option found, break the loop
        }
    }
    await page.locator('.action__submit ').click();
    //Assertions in payment page and order confirmation page
    //email id under shipping
    //await expect(page.locator(".user__name [type='text']").first()).toHaveText("Buddi1@gmail.com");
    const confirmation = await page.locator(".hero-primary").textContent();
    await expect(confirmation).toContain('Thankyou');
    await expect(page.locator('.product-info-column .title').first()).toHaveText("ZARA COAT 3");
    await expect(page.locator('.mt-4')).toHaveText(" Items in your order may ship separately.View your order for shipping updates. ");
    const contactInfo = await page.locator("td[class='title']").textContent();
    const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await console.log(OrderId);
    await console.log(contactInfo);
    const queryEmail = await page.locator(".links").textContent();
    await console.log(queryEmail);
    const timings1 = await page.locator('.info').first().textContent();
    const timings2 = await page.locator('.info').last().textContent();
    await console.log(timings1);
    await console.log(timings2);
    //Dynamically find the order from order history page
    await page.locator("button[routerlink*='myorders']").click();
    const rows = page.locator("tbody tr")
    for (let j = 0; j < await rows.count(); ++j) {
        const rowOrderId = await rows.nth(j).locator("th").textContent();
        if (OrderId.includes(rowOrderId)) {
            await rows.nth(j).locator(".btn-primary").click();
            break;
        }
        const orderid1 = await page.locator('.-main').textContent();
        await console.log(orderid1);
        if (orderid1.includes(rowOrderId)) {
            console.log('order number is',orderid1);

        }

    }
});





