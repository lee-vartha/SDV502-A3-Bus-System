const { JSDOM } = require('jsdom');
const { beforeEach, test, expect, result } = require('../src/script');


describe('Ticket System', () => {
    let dom;
    let document;
    let window;
    beforeEach(() => {
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <body>
                <form id="bookingForm">
                <input id="name" value="John Doe">
                <input id="destination" value="New York">
                <input id="seats" value="3">
                <button type="submit">Submit</button>
                </form>
            <p id="message"></p>
            </body>
            </html>
            `);
        window = dom.window;
        document = dom.window.document;

        global.window = window;
        global.document = document;
        
        ({ name, destination, seats, pricePerSeat, totalFare } = require('../src/script.js'));
    });

    test('getting destination', () => {
        expect(result).toBe("New York");
    });

    test('getting seats', () => {
        expect(result).toBe(3);
    });
    
    test('getting the price per seat', () => {
        expect(multiply(seats * pricePerSeat)).toBe(30);
    });

    test('getting the total fare', () => {
        expect(result).toBe(30);
    });

    test('display confirmation message', () => {
        const expected = `Booking confirmed for John Doe to New York. Seats: 3. Total fare: $30.`;
        expect(message).toBe(expected);
    });
});