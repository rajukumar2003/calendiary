// backend/src/server.js
import express, { json } from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes.js';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(json());
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { prisma };
