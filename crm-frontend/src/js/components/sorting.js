import { render } from "./render.js";
export function sortClient(arr, sortFlag, sortDir) {
  arr.sort(function (a, b) {
    let sort = a[sortFlag] < b[sortFlag];
    if (sortDir == false) sort = a[sortFlag] > b[sortFlag];
    if (sort) return -1;
  });
  render(arr)
}
