const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());

// Sample in-memory storage for testing
let testBookings = [];
let testRooms = [101, 102, 103, 104, 105];

// Sample Booking Route
app.post("/book", (req, res) => {
    const { name, email, checkIn, checkOut } = req.body;
    if (!name || !email || !checkIn || !checkOut) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    if (testRooms.length === 0) {
        return res.status(400).json({ message: "No rooms available!" });
    }

    const roomNumber = testRooms.shift();
    const booking = { name, email, checkIn, checkOut, roomNumber };
    testBookings.push(booking);

    res.status(201).json({ message: "Room booked successfully!", booking });
});

// Run Tests
describe("Hotel Room Booking API Tests", () => {
    test("Should book a room successfully", async () => {
        const res = await request(app)
            .post("/book")
            .send({
                name: "Alice",
                email: "alice@example.com",
                checkIn: "2025-04-01",
                checkOut: "2025-04-05",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.booking).toHaveProperty("roomNumber");
    });

    test("Should fail to book a room if data is missing", async () => {
        const res = await request(app).post("/book").send({
            name: "Bob",
            email: "bob@example.com",
        });

        expect(res.statusCode).toBe(400);
    });
});
