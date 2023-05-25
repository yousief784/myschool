export function getDateTimeNow() {
    const date = new Date();
    const startTime = `${date.getHours() + 7 < 10 ? '0' : ''}${
        date.getHours() + 7
    }:00:00`;

    const getWeekDayIndex = date.getDay() +1 ;
    let weekday = '';

    console.log(getWeekDayIndex);

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

    console.log({ weekday: weekday, startTime: startTime });

    //change current time and date i will need it when i need to test the code
    // const sunday = new Date(date.setDate(date.getDate() + 1 - date.getDay()));
    // console.log(sunday); // Output: Sun May 08 2023 18:57:07 GMT-0400 (Eastern Daylight Time)
    // console.log(date.getHours() - 7);
    return { weekday: weekday, startTime: startTime };
}
