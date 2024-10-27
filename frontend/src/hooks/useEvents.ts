// frontend/src/hooks/useEvents.ts
import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '../types';
import { eventService } from '../services/api';

export const useEvents = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await eventService.getEvents();
            const formattedEvents = response.data.map((event) => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
            }));
            setEvents(formattedEvents);
        } catch (err) {
            setError('Failed to fetch events');
            console.error('Error fetching events:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createEvent = useCallback(async (event: CalendarEvent) => {
        setError(null);
        try {
            const response = await eventService.createEvent(event);
            const newEvent = {
                ...response.data,
                start: new Date(response.data.start),
                end: new Date(response.data.end),
            };

            setEvents(prevEvents => {
                // Ensure we don't add duplicates
                const eventExists = prevEvents.some(e => e.id === newEvent.id);
                if (eventExists) {
                    return prevEvents;
                }
                return [...prevEvents, newEvent];
            });

            return newEvent;
        } catch (err) {
            setError('Failed to create event');
            console.error('Error creating event:', err);
            throw err;
        }
    }, []);

    const updateEvent = useCallback(async (id: string, event: CalendarEvent) => {
        setError(null);
        try {
            const response = await eventService.updateEvent(id, event);
            const updatedEvent = {
                ...response.data,
                start: new Date(response.data.start),
                end: new Date(response.data.end),
            };

            setEvents(prevEvents =>
                prevEvents.map(e => e.id === id ? updatedEvent : e)
            );

            return updatedEvent;
        } catch (err) {
            setError('Failed to update event');
            console.error('Error updating event:', err);
            throw err;
        }
    }, []);

    const deleteEvent = useCallback(async (id: string) => {
        setError(null);
        try {
            await eventService.deleteEvent(id);

            // Optimistic update - remove the event immediately
            setEvents(prevEvents => {
                const eventExists = prevEvents.some(e => e.id === id);
                if (!eventExists) {
                    return prevEvents;
                }
                return prevEvents.filter(e => e.id !== id);
            });
        } catch (err) {
            setError('Failed to delete event');
            console.error('Error deleting event:', err);
            // If delete fails, refresh events to ensure UI is in sync with server
            fetchEvents();
            throw err;
        }
    }, [fetchEvents]);

    // // Initial fetch
    // useEffect(() => {
    //     fetchEvents();
    // }, [fetchEvents]);

    return {
        events,
        isLoading,
        error,
        createEvent,
        updateEvent,
        deleteEvent,
        refreshEvents: fetchEvents,
    };
};