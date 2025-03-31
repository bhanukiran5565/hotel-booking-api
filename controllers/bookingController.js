const { bookings } = require("../models/bookingModel");
const { assignRoom, releaseRoom } = require("../utils/roomAllocator");

// 📌 Book a Room
exports.bookRoom = (req, res) => {
    const { name, email, checkIn, checkOut } = req.body;
    if (!name || !email || !checkIn || !checkOut) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const roomNumber = assignRoom();
    if (!roomNumber) {
        return res.status(400).json({ message: "No rooms available!" });
    }

    const booking = { name, email, checkIn, checkOut, roomNumber };
    bookings.push(booking);

    res.status(201).json({ message: "Room booked successfully!", booking });
};

// 📌 View Booking Details
exports.getBooking = (req, res) => {
    const { email } = req.params;
    const booking = bookings.find(b => b.email === email);

    if (!booking) {
        return res.status(404).json({ message: "Booking not found!" });
    }

    res.json(booking);
};

// 📌 View All Guests
exports.getAllGuests = (req, res) => {
    res.json(bookings);
};

// 📌 Cancel Booking
exports.cancelBooking = (req, res) => {
    const { email } = req.params;
    const index = bookings.findIndex(b => b.email === email);

    if (index === -1) {
        return res.status(404).json({ message: "Booking not found!" });
    }

    releaseRoom(bookings[index].roomNumber);
    bookings.splice(index, 1);
    res.json({ message: "Booking canceled successfully!" });
};

// 📌 Modify Booking
exports.modifyBooking = (req, res) => {
    const { email } = req.params;
    const { checkIn, checkOut } = req.body;
    const booking = bookings.find(b => b.email === email);

    if (!booking) {
        return res.status(404).json({ message: "Booking not found!" });
    }

    if (checkIn) booking.checkIn = checkIn;
    if (checkOut) booking.checkOut = checkOut;

    res.json({ message: "Booking updated successfully!", booking });
};
