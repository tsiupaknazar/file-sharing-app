import { DateTimeFormatOptions } from 'intl';

const options: DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

export const convertTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString(undefined, options);
}