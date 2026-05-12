const { test, expect } = require('@playwright/test');

// Helper function to generate future date-time in local ISO format (YYYY-MM-DDTHH:mm)
function futureDateValue(daysToAdd = 1, hour = 10, minute = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    date.setHours(hour, minute, 0, 0); // set desired time

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    // Format for datetime-local input (no timezone)
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

test('Assignment1', async ({ page }) => {
    const URL = 'https://eventhub.rahulshettyacademy.com';
    const userName = 'sravanthicareer01@gmail.com';
    const passWord = 'Myfirstjob@2021';
    const booking_Email = 'abc@gmail.com';

    // Use future date for both title and event date
    const eventDate_Time = futureDateValue(2, 10, 0); // 2 days ahead, 10:00 AM
    const eventTitle = `Test Event ${eventDate_Time}`;
    //const myEvent = 'Dilli Diwali Mela';
    const myEvent= `Test Event ${eventDate_Time}`;
    const allEvents = page.locator('#event-card a');
    const event = page.locator('#nav-events');
    const eventGrid = page.locator('#event-card ');
    let seatNumberbeforeBooking; 

    // ***************Step 1 — Login***********************
    await page.goto(URL);
    await page.getByPlaceholder('you@email.com').fill(userName);
    await page.getByPlaceholder('••••••').fill(passWord);
    await page.locator('#login-btn').click();
    await page.waitForLoadState('networkidle');
    console.log("Step_1 — Login_Executed successfully");

    //**********************Step 2 — Create a new event****************
   await expect(page.locator('span', { 'hasText': 'Browse Events →' })).toBeVisible();
    await page.locator('.relative ').getByRole('button', { name: 'Admin' }).click();
    await page.locator('.right-0 .items-center ').nth(0).click();
    await page.locator('#event-title-input').fill(eventTitle);

    await page.locator('#admin-event-form textarea').fill(`Here we can write the description of event on ${eventTitle}`);

    await page.getByLabel('city').fill('Guntur');
    await page.getByLabel('venue').fill('abc_ConventionHall');
    await page.getByLabel('Event Date & Time').fill(eventDate_Time);

    await page.getByLabel('Price ($)').fill('500');
    await page.getByLabel('Total Seats').fill('200');
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible({ timeout: 5000 });

    console.log("Step 2 — Create a new event_Successfully");
    console.log(`Created event: ${eventTitle} with date ${eventDate_Time}`); 
    //**************Step 3 — Find the event card and capture seats****************** 

    await event.click();
    await page.waitForLoadState('networkidle');
    await page.locator('#event-card').first().waitFor({ state: 'visible' });
    const allEventsText = await allEvents.allTextContents();
    await expect(page.locator('#event-card').first()).toBeVisible();
    console.log(allEventsText);
    const count = await allEvents.count();
    console.log(count);


    for (let i = 0; i < count; i++) {
        // get the text of each event card anchor
        const eventText = (await allEvents.nth(i).textContent()).trim();
        console.log(`Event ${i}: ${eventText}`);

        if (eventText === myEvent) {
            await expect(allEvents.nth(i)).toHaveText(myEvent);

            // IMPORTANT: go up to the card container, not just <a>
            const card = page.locator('#event-card').nth(i);

            // wait until the seat info span is visible
            await expect(card.locator('span:has-text("seats available")')).toBeVisible();

            // capture the seat info string
            const seatText = (await card.locator('span:has-text("seats available")').textContent()).trim();
            console.log(`Seats info: ${seatText}`);

            // optional: extract just the number
           seatNumberbeforeBooking = parseInt(seatText.match(/\d+/)[0], 10);
            console.log(`Seats availableBefore Booking: ${seatNumberbeforeBooking}`);
            //**************Step 4 — Start booking****************** 
            await card.locator(' #book-now-btn').click();
            await expect(page.locator('#ticket-count')).toHaveText('1');
            const ticketCount = await page.locator('.ticket-count').textContent();
            console.log('default_Ticket_Count_is', ticketCount);
            break;
        }
    }
    //**************Step 5 — Fill booking form****************** 
    await page.getByLabel('Full Name').fill('Sravanthi');
    await page.locator('#customer-email').fill(booking_Email);
    await page.getByPlaceholder('+91 98765 43210').fill('9989105744');
    await page.locator('.confirm-booking-btn').click();
    //**************Step 6 — Verify booking confirmation****************** 
    const confirmMessage = await page.locator('.text-xl').textContent();
    await console.log(confirmMessage);
    await expect(page.locator('.text-xl')).toHaveText('Booking Confirmed! 🎉');
    const ticketConfirm = await page.locator('.py-6 .mb-5').first().textContent();
    await console.log(ticketConfirm);
    //**************Step 7 — Verify in My Bookings****************** 
    await page.locator('#nav-bookings').click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
    const currentURL = page.url(); // to kmow the current URL
    await console.log(currentURL);
    await page.locator('#booking-card').allTextContents();
    const allEventName = page.locator('#booking-card .mb-1');
    await page.locator('#booking-card').first().waitFor()
    await expect(page.locator('#booking-card').first()).toBeVisible();
    const eventCount = await page.locator('#booking-card').count();
    await console.log(eventCount);
    let found = true;
    for (let i = 0; i < eventCount; i++) {
        const eventText = (await allEventName.nth(i).textContent()).trim();
        console.log('booked_Event_name', eventText);
        if (eventText === myEvent) {
            console.log('MatchedEvent', eventText);
            found = true;
            break;
        }
        

    }
   expect(found).toBeTruthy(); 



   //**************Step 8 — Verify seat reduction****************** 
await event.click();
await page.waitForLoadState('networkidle');

const allcount_event = await allEvents.count();
console.log(allcount_event);

for (let j = 0; j < allcount_event; j++) {
    const eName_aB = (await allEvents.nth(j).textContent()).trim(); // event name after booking

    if (eName_aB === myEvent) {
        console.log('Booked_Event', eName_aB);

        const card1 = page.locator('#event-card').nth(j);

        await expect(card1.locator('span:has-text("seats available")')).toBeVisible();

        const seatTextAfterBooking = (await card1.locator('span:has-text("seats available")').textContent()).trim();
        console.log(`****Seats info_after Booking:***** ${seatTextAfterBooking}`);

        const seatNumberAfterBooking = parseInt(seatTextAfterBooking.match(/\d+/)[0], 10);

        // assert seat reduction
        expect(seatNumberAfterBooking).toBeLessThan(seatNumberbeforeBooking);
        break;
    }
}


});
