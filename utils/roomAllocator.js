const { availableRooms } = require("../models/bookingModel");

function assignRoom() {
    if (availableRooms.length === 0) return null;
    return availableRooms.shift();
}

function releaseRoom(roomNumber) {
    availableRooms.push(roomNumber);
}

module.exports = { assignRoom, releaseRoom };
