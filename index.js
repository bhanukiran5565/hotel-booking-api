const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let bookings = [];
let rooms = [101, 102, 103, 104, 105]; // Available room numbers

app.post("/book", (req, res) => {
    const { name, email, checkIn, checkOut } = req.body;
    if (!name || !email || !checkIn || !checkOut) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    if (rooms.length === 0) {
        return res.status(400).json({ message: "No rooms available!" });
    }

    const roomNumber = rooms.shift(); // Assign a room from available rooms
    const booking = { name, email, checkIn, checkOut, roomNumber };
    bookings.push(booking);

    res.status(201).json({ message: "Room booked successfully!", booking });
});

app.get("/book/:email", (req, res) => {
    const email = req.params.email;
    const booking = bookings.find(b => b.email === email);
    if (!booking) {
        return res.status(404).json({ message: "Booking not found!" });
    }
    res.json(booking);
});

app.get("/guests", (req, res) => {
    res.json(bookings);
});

app.delete("/cancel/:email", (req, res) => {
    const email = req.params.email;
    const index = bookings.findIndex(b => b.email === email);
    if (index === -1) {
        return res.status(404).json({ message: "Booking not found!" });
    }

    const [cancelledBooking] = bookings.splice(index, 1);
    rooms.push(cancelledBooking.roomNumber); // Return the room to availability

    res.json({ message: "Booking cancelled successfully!", cancelledBooking });
});

app.put("/modify/:email", (req, res) => {
    const email = req.params.email;
    const { checkIn, checkOut } = req.body;
    const booking = bookings.find(b => b.email === email);
    if (!booking) {
        return res.status(404).json({ message: "Booking not found!" });
    }

    if (checkIn) booking.checkIn = checkIn;
    if (checkOut) booking.checkOut = checkOut;

    res.json({ message: "Booking updated successfully!", booking });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
