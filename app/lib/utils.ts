import Bottleneck from 'bottleneck';

export function millisecondsToMinutes(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  //conditional to check if seconds is less than 10, if so add a 0 to the front of the seconds
  return minutes + ' min '  + (parseInt(seconds) < 10 ? '0' : '') + seconds + ' seconds';
}


//limiter to prevent too many requests to the API

export const limiter = new Bottleneck({
  //maximum amount of requests that can run concurrently
  maxConcurrent: 5,
  //minimum time to wait between each request
  minTime: 500,
  // How many jobs can be executed before the limiter stops executing jobs. If `reservoir` reaches `0`, no jobs will be executed until it is no longer `0`. New jobs will still be queued up.
  reservoir: 5,
  // The increment applied to `reservoir` when `reservoirIncreaseInterval` is in use.
  reservoirIncreaseAmount: 5,
  //Every `reservoirIncreaseInterval` milliseconds, the `reservoir` value will be automatically incremented by `reservoirIncreaseAmount`
  reservoirIncreaseInterval: 1000,
  //The maximum value that `reservoir` can reach when `reservoirIncreaseInterval` is in use.
  reservoirIncreaseMaximum: 5,
});