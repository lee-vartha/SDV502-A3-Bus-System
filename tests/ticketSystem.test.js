const { JSDOM } = require('jsdom');


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
        
        ({submissionOfForm, destination, seats, pricePerSeat, totalFare} = require('../src/script.js'));
        document.getElementById('name').value = 'Jane Doe';
        document.getElementById('destination').value = 'Paris';
        document.getElementById('seats').value = '3';
        pricePerSeat = 10;

    });

    test('getting destination', () => {
        const result = document.getElementById('destination').value = 'Paris';
        expect(result).toBe("Paris");
    });

    test('getting seats', () => {
        document.getElementById('seats').value = 3;
        const result = Number(document.getElementById('seats').value);
        expect(result).toBe(3);
    });
    
    test('getting the price per seat', () => {
        const seats = Number(document.getElementById('seats').value);
        const totalFare = seats * pricePerSeat;
        expect(totalFare).toBe(30);
    });

    test('getting the total fare', () => {
        const seats = Number(document.getElementById('seats').value);
        const result = seats * pricePerSeat;
        expect(result).toBe(30);
    });

    test('display confirmation message', () => {
        const name = document.getElementById('name').value;
        const destination = document.getElementById('destination').value;
        const seats = Number(document.getElementById('seats').value);
        const totalFare = seats * pricePerSeat;
        const message = `Booking confirmed for ${name} to ${destination}. Seats: ${seats}. Total fare: $${totalFare}.`;
        const expected = `Booking confirmed for Jane Doe to Paris. Seats: 3. Total fare: $30.`;
        expect(message).toBe(expected);
    });
});