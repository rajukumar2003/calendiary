// components/Dialog.tsx
import React from 'react';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

interface DialogContentProps {
    children: React.ReactNode;
}

interface DialogHeaderProps {
    children: React.ReactNode;
}

interface DialogTitleProps {
    children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => onOpenChange(false)}
            />
            <div className="relative z-50 bg-white rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    );
};

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
    return (
        <div className="w-full max-w-md p-6">
            {children}
        </div>
    );
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
    return (
        <div className="mb-4">
            {children}
        </div>
    );
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
    return (
        <h2 className="text-xl font-semibold">
            {children}
        </h2>
    );
};