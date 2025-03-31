const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/book", bookingController.bookRoom);
router.get("/:email", bookingController.getBooking);
router.get("/", bookingController.getAllGuests);
router.delete("/cancel/:email", bookingController.cancelBooking);
router.put("/modify/:email", bookingController.modifyBooking);

module.exports = router;
