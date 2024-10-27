// backend/src/controllers/eventController.js
import { prisma } from '../server.js';

const eventController = {
    // Get all events for a user
    async getEvents(req, res) {
        try {
            const events = await prisma.event.findMany({
                where: { userId: req.user.uid },
            });
            res.json(events);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new event
    async createEvent(req, res) {
        try {
            const { title, description, start, end } = req.body;
            const event = await prisma.event.create({
                data: {
                    title,
                    description,
                    start: new Date(start),
                    end: new Date(end),
                    userId: req.user.uid,
                },
            });
            res.status(201).json(event);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update an event
    async updateEvent(req, res) {
        try {
            const { title, description, start, end } = req.body;
            const event = await prisma.event.update({
                where: {
                    id: req.params.id,
                    userId: req.user.uid
                },
                data: {
                    title,
                    description,
                    start: new Date(start),
                    end: new Date(end)
                },
            });
            res.json(event);
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(400).json({ message: error.message });
        }
    },

    // Delete an event
    async deleteEvent(req, res) {
        try {
            const event = await prisma.event.deleteMany({
                where: { id: req.params.id, userId: req.user.uid },
            });

            if (!event.count) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json({ message: 'Event deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default eventController;
