// backend/src/models/eventModel.js
import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default model('Event', eventSchema);