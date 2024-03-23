

export function getYesterdayDay() {
    const yesterday = new Date();
    const data = yesterday.getDate() - 1;
    return data.toString().padStart(2, '0');
  }
  
export function getPastMonth() {
    const pastMonth = new Date();
    const month = pastMonth.getMonth(); 
    return month.toString().padStart(2, '0');
  }
  
export function getPastYear() {
    const numberPastYear = new Date();
    const data = (numberPastYear.getFullYear() - 1);
    return data.toString().padStart(2, '0');
  }