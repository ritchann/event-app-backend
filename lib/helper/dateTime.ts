import parseISO from "date-fns/parseISO";
import { format } from "date-fns";

export class DateTime {
  public static parse(dateTime: string): Date {
    const value: Date = parseISO(dateTime);
    return value;
  }

  public static format(
    date: Date,
    formatStr?:
      | "dd MMM yyyy HH:mm"
      | "date"
      | "datetime"
      | "iso"
      | "isodate"
      | "time"
      | "MMMddyyyy"
      | "MMMdd,yyyy"
      | "ddMMM"
      | "ampm"
      | "MMMddyyyy HHmm"
      | "MMMddyyyy HHmmss"
      | "dateWeekday"
      | "MM/dd/yyyy hh:mm ampm"
      | "MMMdd"
  ) {
    let useFormat: string;
    switch (formatStr) {
      case "dd MMM yyyy HH:mm":
        useFormat = "dd MMM yyyy HH:mm";
        break;
      case "date":
        useFormat = "MM/dd/yyyy";
        break;
      case "datetime":
        useFormat = "MM/dd/yyyy HH:mm:ss";
        break;
      case "time":
        useFormat = "pp";
        break;
      case "iso":
        useFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";
        break;
      case "isodate":
        useFormat = "yyyy-MM-dd";
        break;
      case "MMMddyyyy":
        useFormat = "MMM dd yyyy";
        break;
      case "MMMdd,yyyy":
        useFormat = "MMM dd, yyyy";
        break;
      case "MMMddyyyy HHmm":
        useFormat = "MMM dd yyyy HH:mm";
        break;
      case "MMMddyyyy HHmmss":
        useFormat = "MMM dd yyyy HH:mm:ss";
        break;
      case "ddMMM":
        useFormat = "dd MMM";
        break;
      case "ampm":
        useFormat = "MM/dd/yyyy hh:mm:ss a";
        break;
      case "dateWeekday":
        useFormat = "MM/dd/yyyy EEE";
        break;
      case "MM/dd/yyyy hh:mm ampm":
        useFormat = "MM/dd/yyyy hh:mm a";
        break;
      case "MMMdd":
        useFormat = "MMM dd";
        break;
      default:
        useFormat = "MM/dd/yyyy HH:mm";
        break;
    }
    const value = format(date, useFormat);
    return value;
  }

  public static getShortMonthName(date: Date) {
    const newDate = new Date(date);
    let monthName = "";
    switch (newDate.getMonth()) {
      case 0:
        monthName = "Jan";
        break;
      case 1:
        monthName = "Feb";
        break;
      case 2:
        monthName = "Mar";
        break;
      case 3:
        monthName = "Apr";
        break;
      case 4:
        monthName = "May";
        break;
      case 5:
        monthName = "June";
        break;
      case 6:
        monthName = "July";
        break;
      case 7:
        monthName = "Aug";
        break;
      case 8:
        monthName = "Sep";
        break;
      case 9:
        monthName = "Oct";
        break;
      case 10:
        monthName = "Nov";
        break;
      case 11:
        monthName = "Dec";
        break;
    }

    return monthName;
  }

  public static addDays(date: Date, amountDays: number) {
    const newDate = new Date(date);
    return new Date(newDate.setDate(newDate.getDate() + amountDays));
  }

  public static addYears(date: Date, amountYears: number) {
    const newDate = new Date(date);
    return new Date(newDate.setFullYear(newDate.getFullYear() + amountYears));
  }

  public static startOfNextMonth(date: Date) {
    return this.addMonths(this.startOfMonth(date), 1);
  }

  public static startOfPreviousMonth(date: Date) {
    return this.addMonths(this.startOfMonth(date), -1);
  }

  public static addMonths(date: Date, amountMonths: number) {
    const newDate = new Date(date);

    newDate.setMonth(newDate.getMonth() + amountMonths, 1);
    const daysInMonth = DateTime.getDaysInMonth(
      newDate.getFullYear(),
      newDate.getMonth()
    );
    if (date.getDate() > daysInMonth)
      return new Date(newDate.getFullYear(), newDate.getMonth(), daysInMonth);
    else
      return new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        date.getDate()
      );
  }

  public static startOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  public static startOfWeek(date: Date, weekStartDay: number) {
    let newDate = new Date(date);
    while (newDate.getDay() != weekStartDay)
      newDate = DateTime.addDays(newDate, -1);
    return newDate;
  }

  public static getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  public static getLastDateInMonth(date: Date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      DateTime.getDaysInMonth(date.getFullYear(), date.getMonth())
    );
  }

  public static addMinutes(date: Date, amountMinutes: number) {
    const newDate = new Date(date);
    return new Date(newDate.setMinutes(newDate.getMinutes() + amountMinutes));
  }

  public static addSeconds(date: Date, amountSeconds: number) {
    const newDate = new Date(date);
    return new Date(newDate.setSeconds(newDate.getSeconds() + amountSeconds));
  }

  public static getDifferenceInDays(from: Date, to: Date) {
    return Math.round(
      (this.withoutTime(to).getTime() - this.withoutTime(from).getTime()) /
        (60 * 60 * 24 * 1000)
    );
  }

  public static getTicks(date: Date) {
    const dStart = new Date(1970, 1, 1);
    return (date.getTime() - dStart.getTime()) * 10000;
  }

  public static weekNumber(date: Date, start: Date) {
    const difference = this.getDifferenceInDays(start, date);
    let result = difference / 7;
    if (difference % 7 !== 0) result = result + 1;
    while (result > 52) result = result - 52;
    return Math.trunc(result);
  }

  public static withoutTime(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  public static getTimeSinceMidnight(date: Date) {
    const midnight = new Date(date);
    midnight.setHours(0, 0, 0, 0);
    return date.getTime() - midnight.getTime();
  }

  public static getFirstDateInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  public static getTotalMinutes(date: Date) {
    return new Date(date).getHours() * 60 + new Date(date).getMinutes();
  }

  public static convertToUTC(date: Date) {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      )
    );
  }
}
