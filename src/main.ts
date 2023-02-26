/*
File for function of the index.html file
*/

//Function for the button of the date
function getDay(){
    const today : FormatDate = getToday();
    let day : string = document.forms[0].elements["dateField"].value;

    let date : FormatDate = parseFormatDate(day);

    let verb : string = isBefore(date, today) ? "était" : "sera";

    document.getElementById("dateResponse").innerHTML = "Le " + dateToString(date) + " " + verb + " un " + dayOfWeek(date) + " (Année bissextile : " + booleanToFrench(isLeapYer(date.year)) + ")";
}

function booleanToFrench(value : boolean) : string{
    return value ? "Oui" : "Non";
}

//-------------------------------------------------------------------------------------------------------
/*
This is for file "days.ts" but this doesn't work if it's not in this file
*/

//Type for following functions
type FormatDate = {
    day : number,
    month : number,
    year : number
}


//Determine if year is a leap year or not
function isLeapYer(year : number) : boolean {
    return (((year%4==0) && (year%100!=0)) || (year%400==0));
}

//Get the number of days in specific month
function daysInMonth(year : number, monthIndex : number) : number{

    if(isLeapYer(year) && monthIndex == 2){
        return 29;
    } else if(monthIndex == 2){
        return 28;
    } else if((monthIndex%2==1 && monthIndex<8) || (monthIndex%2==0 && monthIndex>7)){
        return 31;
    } else {
        return 30;
    }
}

//Get the day of a specific date
function dayOfWeek(date : FormatDate){

    const weekDaysName : Array<string> = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    
    const leapMonthOffets : Array<number> = [0, 3, 6, 0, 3, 5, 1, 3, 6, 2, 4, 0, 2];
    const unLeapMonthOffets : Array<number> = [0, 4, 0, 0, 3, 5, 1, 3, 6, 2, 4, 0, 2];

    const monthOffet : number = isLeapYer(date.year) ? leapMonthOffets[date.month] : unLeapMonthOffets[date.month];

    let century : number = Math.trunc(date.year / 100);
    let centuryYear : number = date.year % 100;

    let res : number = (Math.trunc(century/4) + Math.trunc(centuryYear/4) + centuryYear + 5*century + monthOffet + date.day + 2)%7;

    return weekDaysName[res];

}

//Create a date from a string. The string must be at format YYYY-MM-DD
function parseFormatDate(rawDate : string) : FormatDate {
    
    let date : FormatDate = {day: 0, month: 0, year: 0};

    date.year = parseInt(rawDate.split('-')[0]);
    date.month = parseInt(rawDate.split('-')[1]);
    date.day = parseInt(rawDate.split('-')[2]);

    return date;
}

//Create a string from a date to show it.
function dateToString(date : FormatDate) : string {
    return date.day + "/" + date.month + "/" + date.year;
}

//Determine if date1 is before date2
function isBefore(date1 : FormatDate, date2 : FormatDate) : boolean{
    return (date1.year < date2.year) ||
            (date1.year == date2.year && date1.month < date2.month) ||
            (date1.year == date2.year && date1.month == date2.month && date1.day < date2.day);
}

//Get today date as a FormatDate
function getToday() : FormatDate {
    const today : Date = new Date();
    return {day: today.getDate(), month: today.getMonth()+1, year: today.getFullYear()}; //the method Date.getMonth start at 0 for January but this programm start at 1 for January
}