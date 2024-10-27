
import { Dispatch, SetStateAction } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export interface CalendarEvent {
    id?: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
}

export interface NewEventFormProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    newEvent: CalendarEvent;
    setNewEvent: Dispatch<SetStateAction<CalendarEvent>>;
    handleAddEvent: () => void;
}

// CalendarApp.tsx
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek'; 
import {getDay} from 'date-fns/getDay';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/Textarea";
import {enUS} from 'date-fns/locale/en-US';
import {fr} from 'date-fns/locale/fr';

// import { CalendarEvent } from './types';

const locales = {
    'en-US': enUS,
    'fr': fr,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const NewEventForm: React.FC<NewEventFormProps> = ({
    isOpen,
    setIsOpen,
    newEvent,
    setNewEvent,
    handleAddEvent,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Event Title"
                        value={newEvent.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                    <Input
                        type="datetime-local"
                        value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                    />
                    <Input
                        type="datetime-local"
                        value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                    />
                    <Textarea
                        placeholder="Event Description"
                        value={newEvent.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                    <button
                        className=' px-4 py-2 rounded-md bg-[#e8e8e2] p-2 text-[#14343b] hover:text-[#64645e]'
                        onClick={handleAddEvent}>Save Event</button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const CalendarApp: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newEvent, setNewEvent] = useState<CalendarEvent>({
        title: '',
        start: new Date(),
        end: new Date(),
        description: ''
    });

    const handleAddEvent = (): void => {
        setEvents([...events, { ...newEvent, id: crypto.randomUUID() }]);
        setIsOpen(false);
        setNewEvent({
            title: '',
            start: new Date(),
            end: new Date(),
            description: ''
        });
    };

    const handleSelectSlot = (slotInfo: SlotInfo): void => {
        setNewEvent({
            ...newEvent,
            start: slotInfo.start as Date,
            end: slotInfo.end as Date
        });
        setIsOpen(true);
    };

    return (
        <div className="h-screen p-4 ">
            <div className="mb-4 ">
                <button
                    className=' px-4 py-2 rounded-md bg-[#e8e8e2] p-2 text-[#14343b] hover:text-[#64645e]'
                    onClick={() => setIsOpen(true)}>Add Event</button>
            </div>

            <NewEventForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                handleAddEvent={handleAddEvent}
            />

            <div className="h-[600px]">
                <Calendar<CalendarEvent>
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    className="bg-[#f3f3ed] p-4 rounded-lg shadow "
                />
            </div>
        </div>
    );
};

export default CalendarApp;