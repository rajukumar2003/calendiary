import React, { useState, useEffect } from 'react';
import { Calendar, SlotInfo } from 'react-big-calendar';
import { Loader2, Plus, RefreshCw } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from '../../types';
import { useEvents } from '../../hooks/useEvents';
import EventForm from './EventForm';
import EventDetails from './EventDetails';
import { calendarLocalizer } from '../../utils/dateUtils';
import { Link } from 'react-router-dom';

// Custom styles for react-big-calendar
const customStyles = `
.rbc-calendar {
    font-family: 'SF Pro Display', sans-serif;
}

.rbc-header {
    padding: 12px;
    font-weight: 500;
    color: #374151;
    border-bottom: 1px solid #F3F4F6;
}

.rbc-today {
    background-color: #F0FDF4;
}

.rbc-event {
    background-color: #059669;
    border-radius: 4px;
} `;

const CalendarApp = () => {
    const { events, createEvent, updateEvent, deleteEvent, refreshEvents, isLoading } = useEvents();
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

    useEffect(() => {
        // Inject custom styles into the document
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = customStyles;
        document.head.appendChild(styleSheet);

        // Refresh events on component mount
        refreshEvents();

        return () => {
            // Cleanup style element if needed
            document.head.removeChild(styleSheet);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-white">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    const handleSelectSlot = (slotInfo: SlotInfo): void => {
        setSelectedEvent({
            title: '',
            description: '',
            start: new Date(slotInfo.start),
            end: new Date(slotInfo.end),
        });
        setFormMode('create');
        setIsFormOpen(true);
    };

    const handleSelectEvent = (event: CalendarEvent) => {
        setSelectedEvent({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
        });
        setIsDetailsOpen(true);
    };

    const handleEditEvent = (event: CalendarEvent) => {
        setSelectedEvent({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
        });
        setFormMode('edit');
        setIsDetailsOpen(false);
        setIsFormOpen(true);
    };

    const handleSubmitEvent = async (event: CalendarEvent) => {
        try {
            if (formMode === 'create') {
                const promise = createEvent(event);
                toast.promise(promise, {
                    loading: 'Creating event...',
                    success: 'Event created successfully 🎉',
                    error: 'Failed to create event',
                });
                const newEvent = await promise;
                setSelectedEvent(newEvent);
            } else if (event.id) {
                const updatedEvent = await updateEvent(event.id, event);
                setSelectedEvent(updatedEvent);
                toast.success('Event updated successfully 🎉');
            }
            setIsFormOpen(false);
            setSelectedEvent(null);
        } catch (error) {
            toast.error('Failed to save event');
            console.error('Failed to save event:', error);
        }
    };

    const handleDeleteEvent = async (id: string) => {
        try {
            await deleteEvent(id);
            setIsDetailsOpen(false);
            setSelectedEvent(null);
            toast.success('Event deleted successfully 🎉');
        } catch (error) {
            toast.error('Failed to delete event');
            console.error('Failed to delete event:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white font-['SF Pro Display']">
            {/* Top Navigation Bar */}
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            to={'/dashboard'}
                            className="text-2xl font-medium text-black">
                            Calendar
                        </Link>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => refreshEvents()}
                                className="p-2 hover:bg-gray-50 rounded-lg transition-all text-gray-600 flex items-center gap-2"
                            >
                                <RefreshCw size={18} />
                                <span className="text-sm">Refresh</span>
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedEvent({
                                        title: '',
                                        description: '',
                                        start: new Date(),
                                        end: new Date(),
                                    });
                                    setFormMode('create');
                                    setIsFormOpen(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-all"
                            >
                                <Plus size={18} />
                                New Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6">
                {selectedEvent && (
                    <>
                        <EventForm
                            isOpen={isFormOpen}
                            onClose={() => setIsFormOpen(false)}
                            event={selectedEvent}
                            onSubmit={handleSubmitEvent}
                            mode={formMode}
                        />
                        <EventDetails
                            isOpen={isDetailsOpen}
                            onClose={() => setIsDetailsOpen(false)}
                            event={selectedEvent}
                            onEdit={handleEditEvent}
                            onDelete={handleDeleteEvent}
                        />
                    </>
                )}

                <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                    <div className="h-[700px]">
                        <Calendar<CalendarEvent>
                            localizer={calendarLocalizer}
                            events={events.map(event => ({
                                ...event,
                                start: new Date(event.start),
                                end: new Date(event.end),
                            }))}
                            startAccessor="start"
                            endAccessor="end"
                            selectable
                            onSelectSlot={handleSelectSlot}
                            onSelectEvent={handleSelectEvent}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>

            <Toaster position="top-center" />
        </div>
    );
};

export default CalendarApp;