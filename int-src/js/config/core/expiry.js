export const expiryMonths = [
        {
            text: "January",
            short: "Jan",
            daysInMonth: 31,
            id: '01'
        },
        {
            text: "February",
            short: "Feb",
            daysInMonth: 28,
            id: "02"
        },
        {
            text: "March",
            short: "MAR",
            daysInMonth: 31,
            id: "03"
        },
        {
            text: "April",
            short: "Apr",
            daysInMonth: 30,
            id: "04"
        },
        {
            text: "May",
            short: "May",
            daysInMonth: 31,
            id: "05"
        },
        {
            text: "June",
            short: "Jun",
            daysInMonth: 30,
            id: "06"
        },
        {
            text: "July",
            short: "Jul",
            daysInMonth: 31,
            id: "07"
        },
        {
            text: "August",
            short: "Aug",
            daysInMonth: 31,
            id: "08"
        },
        {
            text: "September",
            short: "Sep",
            daysInMonth: 30,
            id: "09"
        },
        {
            text: "October",
            short: "Oct",
            daysInMonth: 31,
            id: "10"
        },
        {
            text: "November",
            short: "Nov",
            daysInMonth: 30,
            id: "11"
        },
        {
            text: "December",
            short: "Dec",
            daysInMonth: 31,
            id: "12"
        }
    ];

export const expiryYears =() => {
    // Get current year
    const currentYear = parseInt(new Date().getFullYear().toString().substring(2));
    const currentYearFull = parseInt(new Date().getFullYear());

    // Store the valid years
    const validYears = [];

    // Generate the valid years (+ 10)
    for(let i = 0; i < 10; i ++) {
        // Push to valid years
        validYears.push({
            id: currentYear + i,
            value: currentYearFull + i
        });
    } 

    // return the valid years
    return validYears;
};