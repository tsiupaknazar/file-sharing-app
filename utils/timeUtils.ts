import { DateTimeFormatOptions } from 'intl';

const options: DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

export const convertTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString(undefined, options);
}

export const parseDate = (dateString: string) => {
    const parts = dateString.split(" at ");
    const datePart = parts[0];
    const timePart = parts[1];
    const [day, month, year] = datePart.split(" ");
    const [hour, minute, second] = timePart.split(":");
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
    return `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.padStart(2, '0')}T${hour}:${minute}:${second}`;
}
