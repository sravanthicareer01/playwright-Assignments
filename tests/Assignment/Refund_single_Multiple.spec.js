const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const login_Cred = { email: 'xyz2020@gmail.com', password: 'Myfirstjob@2021' };

//Login Re-use Helper function

async function loginAndGoToBooking(page) {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByLabel('Email').fill(login_Cred.email);
    await page.getByPlaceholder('••••••').fill(login_Cred.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

}
// Test1 : Eligible for Refund for single Ticket
test('eligible for refund_Single_Ticket', async ({ page }) => {

    await loginAndGoToBooking(page);
    // Book single ticket for event
    await page.locator('#nav-events').click();
    await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/events/3');
    const tktCount = await page.locator('#ticket-count').textContent();
    await console.log(tktCount);
    await page.getByLabel('Full Name').fill('sravanthi1305');
    await page.getByPlaceholder('you@email.com').fill('single_ticket@gmail.com');
    await page.locator('#phone').fill('9898979695');
    await page.locator('#confirm-booking').click();
    const confirmation_1 = await page.locator('.text-xl').textContent();
    await console.log('Status of Single Ticket is ', confirmation_1);
    // Navigate to Booking Details
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();
    //Validate booking ref first letter matches event name first letter - D-RZWSBV
    const bookingReference = await page.locator('span.font-mono.font-bold').innerText();
    const eventTitle = await page.locator('h1').innerText();
    await expect(bookingReference.charAt(0)).toBe(eventTitle.charAt(0));
    await page.locator('#check-refund-btn').click();
    //Spinner must be appear Immediately
    await expect(page.locator('#refund-spinner')).toBeVisible();
    //Spinner disappear after 4 sec
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
    const refundResult = await page.locator('#refund-result').textContent(); // text present in the locator
    const refund = page.locator('#refund-result'); // its just alocator to check whether its visible or not
    await console.log(refundResult);
    await expect(refund).toBeVisible();
    await expect(refundResult).toContain('Eligible for refund.');
    await expect(refundResult).toContain(' Single-ticket bookings qualify for a full refund.');

});
// Test1 : Eligible for Refund for multiple Tickets
test('eligible for refund_multiple_Tickets', async ({ page }) => {
    await loginAndGoToBooking(page);
    await page.locator('#nav-events');
    await page.locator('#event-card').first().getByTestId('book-now-btn').click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/events/3');
    const ticket_Count_3 = await page.locator('#ticket-count').textContent();
    await console.log(ticket_Count_3);
    await page.locator('button:has-text("+")').click();
    await page.locator('button:has-text("+")').click();
    const ticket_Count_3 = await page.locator('#ticket-count').textContent();
    await console.log(ticket_Count_3); // increased to 3 
    // Booking by filling required details
    await page.locator('#customerName').fill('Sravanthi3');
    await page.getByPlaceholder('you@email.com').fill('sravs@gmail.com');
    await page.locator('#phone').fill('8786857545');
    await page.locator('#confirm-booking').click();
    // Navigate to booking details

    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    // Validate booking ref first letter matches event name first letter
    const bookingRef3 = await page.locator('span.font-mono.font-bold').innerText();
    const eventTitle3 = await page.locator('h1').innerText();
    expect(bookingRef3.charAt(0)).toBe(eventTitle3.charAt(0));
    await page.locator('#check-refund-btn').click();

    // Spinner must appear immediately
    await expect(page.locator('#refund-spinner')).toBeVisible();

    // Wait for spinner to disappear after 4s
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

    // Validate ineligible message
    const result3 = page.locator('#refund-result');
    await expect(result3).toBeVisible();
    await expect(result3).toContainText('Not eligible for refund');
    await expect(result3).toContainText('Group bookings (3 tickets) are non-refundable');
    const final3=await result3.textContent();
    await console.log(final3);
});








