interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ className = '', ...props }) => {
    return (
        <textarea
            {...props}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
};