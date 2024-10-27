// src/utils/dateUtils.ts
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { dateFnsLocalizer } from 'react-big-calendar';

export const formatDateTime = (date: Date): string => {
    return format(date, "yyyy-MM-dd'T'HH:mm");
};

export const formatDisplayDate = (date: Date): string => {
    return format(date, 'PPp', { locale: enUS });
};

const locales = {
    'en-US': enUS,
};

export const calendarLocalizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
