import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/Textarea";
import { EventFormProps } from '../../types';
import { formatDateTime } from '../../utils/dateUtils';
import {toast, Toaster} from 'sonner';

const EventForm: React.FC<EventFormProps> = ({
    isOpen,
    onClose,
    event,
    onSubmit,
    mode
}) => {
    // Initialize form data when the event prop changes
    const [formData, setFormData] = useState(event);

    // Update form data when event prop changes
    useEffect(() => {
        setFormData(event);
    }, [event]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleDateChange = (field: 'start' | 'end', value: string) => {
        try {
            const newDate = new Date(value);
            if (!isNaN(newDate.getTime())) {
                setFormData(prev => ({
                    ...prev,
                    [field]: newDate
                }));
            }
        } catch (error) {
            console.error(`Invalid date value for ${field}:`, value);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Add New Event' : 'Edit Event'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Event Title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                    />
                    <Input
                        type="datetime-local"
                        value={formatDateTime(formData.start)}
                        onChange={(e) => handleDateChange('start', e.target.value)}
                        required
                    />
                    <Input
                        type="datetime-local"
                        value={formatDateTime(formData.end)}
                        onChange={(e) => handleDateChange('end', e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder="Event Description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-[#e8e8e2] text-[#14343b] hover:text-[#64645e]"
                    >
                        {mode === 'create' ? 'Create Event' : 'Update Event'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EventForm;