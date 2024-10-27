//backend/src/routes/eventRoutes.js

import { Router } from 'express';
import eventController from '../controllers/eventController.js';
import auth from '../middleware/auth.js';

const router = Router();
router.use(auth);

const { getEvents, createEvent, updateEvent, deleteEvent } = eventController;

router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;