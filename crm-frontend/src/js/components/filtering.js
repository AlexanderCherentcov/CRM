export function filterClient(arr, prop, value) {
  return arr.filter(function (client) {
    if (client[prop].includes(value.trim())) return true;
  });
}
