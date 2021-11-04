const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb+srv://leon:papaya32@cluster0.tcbkj.mongodb.net/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = main;

