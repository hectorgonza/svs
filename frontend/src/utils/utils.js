 export function addHours(date, hours) {
    date.setHours(date.getHours() + hours);

    return date;
}

export function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}
  export function durationMin (startDate, endDate){
    var diffMs = endDate - startDate;
    return Math.floor((diffMs % 86400000) / 3600000); 
  }