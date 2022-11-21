import {
    previousSunday,
    nextSunday,
    previousMonday,
    nextMonday,
    previousTuesday,
    nextTuesday,
    previousWednesday,
    nextWednesday,
    previousThursday,
    nextThursday,
    previousFriday,
    nextFriday,
    previousSaturday,
    nextSaturday,
    getMonth, getDate, getDay
} from 'date-fns';

export const CalendarService = {
    previousDays: [
        previousSunday,
        previousMonday,
        previousTuesday,
        previousWednesday,
        previousThursday,
        previousFriday,
        previousSaturday
    ],
    nextDays: [
        nextSunday,
        nextMonday,
        nextTuesday,
        nextWednesday,
        nextThursday,
        nextFriday,
        nextSaturday
    ],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ],
    date: new Date(),

    getCurrentWeekDates() {
        const day = getDay(this.date);
        const currentWeekDates = [];
        for (let i = 0; i < day; i++) currentWeekDates.push(getDate(new Date(this.previousDays[i](this.date))));
        currentWeekDates.push(getDate(this.date));
        for (let i = day + 1; i < 7; i++) currentWeekDates.push(getDate(this.nextDays[i](this.date)));
        return currentWeekDates;
    },

    getCurrentDate() {
        return getDate(this.date);
    },

    getCurrentMonth() {
        return this.months[getMonth(this.date)];
    },

    getDays() {
        return this.days;
    }
}
