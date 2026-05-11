const { test, expect } = require('@playwright/test');

test('Assignment1', async ({ page }) => {
    const URL = 'https://eventhub.rahulshettyacademy.com';
    const userName = 'sravanthicareer01@gmail.com';
    const passWord = 'Myfirstjob@2021';
    const eventTitle = `Test Event ${Date.now()}`;

    // 👉 Inline future date calculation (2 days ahead, 10:00 AM local)
    const date = new Date();
    date.setDate(date.getDate() + 2);
    date.setHours(10);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    const eventDate_Time = `${yyyy}-${mm}-${dd}T${hh}:${min}`;

    // Step 1 — Login
    await page.goto(URL);
    await page.getByPlaceholder('you@email.com').fill(userName);
    await page.getByPlaceholder('••••••').fill(passWord);
    await page.locator('#login-btn').click();
    await page.waitForLoadState('networkidle');
    console.log("Step 1 — Login executed successfully");

    // Step 2 — Create event
    await expect(page.locator('span', { 'hasText': 'Browse Events →' })).toBeVisible();
    await page.locator('.relative ').getByRole('button', { name: 'Admin' }).click();
    await page.locator('.right-0 .items-center ').nth(0).click();
    await page.locator('#event-title-input').fill(eventTitle);

    await page.locator('#admin-event-form textarea').fill(`Here we can write the description of event on ${eventTitle}`);

    await page.getByLabel('city').fill('Guntur');
    await page.getByLabel('venue').fill('abc_ConventionHall');
    await page.getByLabel('Event Date & Time').fill(eventDate_Time); // ✅ dynamic future date
    await page.getByLabel('Price ($)').fill('500');
    await page.getByLabel('Total Seats').fill('200');

    await page.locator('#add-event-btn').click();

    // Toast assertion
    await expect(page.getByText('Event created!')).toBeVisible({ timeout: 5000 });

    console.log("Step 2 — Event created successfully");
    console.log(`Created event: ${eventTitle}`);
    console.log(`Event scheduled for: ${eventDate_Time}`);
});
