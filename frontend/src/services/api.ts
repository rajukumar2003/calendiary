//calendiary/frontend/src/services/api.ts

import axios from 'axios';
import { CalendarEvent } from '../types';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const eventService = {
    getEvents: () => api.get<CalendarEvent[]>('/events'),
    createEvent: (event: CalendarEvent) => api.post<CalendarEvent>('/events', event),
    updateEvent: (id: string, event: CalendarEvent) =>
        api.put<CalendarEvent>(`/events/${id}`, event),
    deleteEvent: (id: string) => api.delete(`/events/${id}`),
};
