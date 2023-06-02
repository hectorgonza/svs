 
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

  export function packAsNbytes(hexStr: string, n = 32) {
    if (hexStr.substring(0, 2) === "0x") {
      hexStr = hexStr.substring(2);
    }
    const words = Math.ceil(hexStr.length / (n * 2));
    const targetLength = words * (n * 2);
    const zeroes = "0".repeat(targetLength - hexStr.length);
    return "0x" + zeroes + hexStr;
  }
  
