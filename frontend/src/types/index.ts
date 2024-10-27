// src/types/index.ts
export interface CalendarEvent {
    id?: string;
    title: string;
    description: string;
    start: Date;
    end: Date;
    userId?: string;
}

export interface EventFormProps {
    isOpen: boolean;
    onClose: () => void;
    event: CalendarEvent;
    onSubmit: (event: CalendarEvent) => void;
    mode: 'create' | 'edit';
}

export interface EventDetailsProps {
    event: CalendarEvent;
    onEdit: (event: CalendarEvent) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
    isOpen: boolean;
}