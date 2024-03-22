

export function getYesterdayDay() {
    const yesterday = new Date();
    const data = yesterday.getDate() - 1;
    return data.toString()
  }
  
export function getPastMonth() {
    const pastMonth = new Date();
    const data = (pastMonth.getMonth());
    return data.toString()
  }
  
export function getPastYear() {
    const numberPastYear = new Date();
    const data = (numberPastYear.getFullYear() - 1);
    return data.toString()
  }