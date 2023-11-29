
export function millisecondsToMinutes(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  //conditional to check if seconds is less than 10, if so add a 0 to the front of the seconds
  return minutes + ' min '  + (parseInt(seconds) < 10 ? '0' : '') + seconds + ' seconds';
}


export function debounce(callback: any, delay: number) {
  let timer: any;

  return (...args: any) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          let output = callback(...args);
          resolve(output);
        } catch (err){
          reject(err);
        }
      })
    })
}
}


export function queue(func: () => Promise<any>, delay: number) {
  let functionQueue: (() => Promise<any>)[] = [];
  let waiting = true;
}