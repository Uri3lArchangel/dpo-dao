export const refineDate = (timestamp:number)=>{
    const refinedTS = timestamp*1000 + (7 * 3600 * 24*1000)
  const date = new Date(refinedTS)
  const sevenDaysAheadDate = new Date(date);
  const year = sevenDaysAheadDate.getFullYear();
  const month = String(sevenDaysAheadDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(sevenDaysAheadDate.getDate()).padStart(2, '0');
  const hours = String(sevenDaysAheadDate.getHours()).padStart(2, '0');
  const minutes = String(sevenDaysAheadDate.getMinutes()).padStart(2, '0');
  const seconds = String(sevenDaysAheadDate.getSeconds()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate
  }