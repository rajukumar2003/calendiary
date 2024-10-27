import React from 'react';
import { EventDetailsProps } from '../../types';
import { X, Calendar, Clock, FileText, Edit2, Trash2 } from 'lucide-react';
import { formatDisplayDate } from '../../utils/dateUtils';

const EventDetails: React.FC<EventDetailsProps> = ({ event, onEdit, onDelete, onClose, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="relative w-full max-w-md transform scale-100 transition-all">
                <div className="relative bg-[#fcfcf9] rounded-lg shadow-xl overflow-hidden border border-[#1A3636]/20">
                    {/* Header */}
                    <div className="bg-[#f3f3ed] px-6 py-4 flex items-center justify-between border-b border-[#1A3636]/20">
                        <h2 className="text-xl font-semibold text-[#1A3636]">
                            Event Details
                        </h2>
                        <button
                            onClick={onClose}
                            title="Close"
                            className="text-[#1A3636]/70 hover:text-[#1A3636] transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4">
                        <div className="space-y-4">
                            {/* Title */}
                            <div className="flex items-start space-x-3">
                                <Calendar className="h-5 w-5 text-[#1A3636] mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-[#1A3636]/70">
                                        Event Title
                                    </p>
                                    <p className="text-base font-semibold text-[#1A3636]">
                                        {event.title}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex items-start space-x-3">
                                <FileText className="h-5 w-5 text-[#1A3636] mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-[#1A3636]/70">
                                        Description
                                    </p>
                                    <p className="text-base text-[#1A3636]">
                                        {event.description || 'No description provided'}
                                    </p>
                                </div>
                            </div>

                            {/* Time Details */}
                            <div className="flex items-start space-x-3">
                                <Clock className="h-5 w-5 text-[#1A3636] mt-1" />
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-sm font-medium text-[#1A3636]/70">
                                            Starts
                                        </p>
                                        <p className="text-base text-[#1A3636]">
                                            {formatDisplayDate(event.start)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#1A3636]/70">
                                            Ends
                                        </p>
                                        <p className="text-base text-[#1A3636]">
                                            {formatDisplayDate(event.end)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-[#e8e8e2] px-6 py-4 flex justify-end space-x-3 border-t border-[#1A3636]/20">
                        <button
                            onClick={() => onEdit(event)}
                            className="inline-flex items-center px-4 py-2 bg-[#fcfcf9] text-[#14343b] text-sm font-medium rounded-md  hover:outline "
                        >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(event.id!)}
                            className="inline-flex items-center px-4 py-2 bg-[#fcfcf9] text-[#14343b] text-sm font-medium rounded-md hover:outline "
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;