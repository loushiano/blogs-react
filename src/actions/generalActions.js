import { push } from "connected-react-router";
import * as moment from "moment";
export const NOTHING = "NOTHING";
export const daysOfWeak = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

export function goTo(path) {
  return dispatch => {
    return dispatch(push(path));
  };
}

export function nothing() {
  return {
    type: NOTHING
  };
}

export function formatWithLocalZone(startDate, hours) {
  if (typeof startDate == "string") {
    startDate = getMoment(startDate);
  }
  return (
    formatDateWithFormat(startDate, "DD-MM-YYYY hh:mm a") +
    " To " +
    moment(startDate.toDate())
      .add("hours", hours)
      .format("hh:mm a")
  );
}

export function formatDateWithFormat(startDate, format) {
  return moment(startDate.toDate()).format(format);
}
export function getDayOfDate(startDate,withMonth=false) {
    if (typeof startDate =="string") {
        startDate = getMoment(startDate);
    }
    
    let moment2 = moment(startDate.toDate());
    var days = getRemainingDays(moment2.format());
    return (days==0?"Today":days==1?"Tomorrow":daysOfWeak[moment2.isoWeekday()-1] +(withMonth?" "+months[moment2.month()]:" The") +" " + moment2.format("Do")) + " At " + moment2.format("hh:mm a");
}

export function getDayOfMonth(startDate) {
    if (typeof startDate =="string") {
        startDate = getMoment(startDate);
    }
    
    let moment2 = moment(startDate.toDate());
    return moment2.format("DD");
}
export function getMonth(startDate) {
    if (typeof startDate =="string") {
        startDate = getMoment(startDate);
    }
    
    let moment2 = moment(startDate.toDate());
    return moment2.format("MMM");
}
export function formatDate(date) {
  return moment.utc(date).format("DD-MM-YYYY hh:mm a");
}

export function getMoment(date) {
  if (typeof date == "string") {
    return moment.utc(date);
  }
}

export function getRemainingDays(date) {
  return date != null
    ? Math.floor(
        (new Date(Date.parse(date)).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
      )
    : 0;
}
