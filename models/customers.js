const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
});

module.exports = mongoose.model("customer", customerSchema);