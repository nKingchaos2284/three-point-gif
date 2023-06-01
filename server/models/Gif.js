const { Schema, model } = require('mongoose');

const gifSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

const Gif = model('Gif', gifSchema);

module.exports = Gif;
