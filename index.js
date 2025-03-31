const express = require("express");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
