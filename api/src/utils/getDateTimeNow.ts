export function getDateTimeNow() {
    const date = new Date();
    const startTime = `${date.getHours() + 12 < 10 ? '0' : ''}${
        date.getHours() + 12
    }:00:00`;
    const getWeekDayIndex = date.getDay()
    let weekday = '';

    switch (getWeekDayIndex) {
        case 0:
            weekday = 'Sunday';
            break;
        case 1:
            weekday = 'Monday';
            break;
        case 2:
            weekday = 'Tuesday';
            break;
        case 3:
            weekday = 'Wednesday';
            break;
        case 4:
            weekday = 'Thursday';
            break;
        case 5:
            weekday = 'Friday';
            break;
        case 6:
            weekday = 'Saturday';
            break;
        default:
            console.log('Invalid weekday');
    }

    console.log('time', {weekday: weekday, startTime: startTime})

    return {weekday: weekday, startTime: startTime};
}
