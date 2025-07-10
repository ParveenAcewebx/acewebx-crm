export function formatDateForMySQL(date) {
  const d = new Date(date)
  const pad = n => (n < 10 ? '0' + n : n)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
export function formatDate(date) {
  const d = new Date(date)

  if (isNaN(d.getTime())) return '' // Handle invalid date

  const pad = n => (n < 10 ? '0' + n : n)
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`
}




export function formatDatePipeline(date) {
  const d = new Date(date);

  if (isNaN(d.getTime())) return ''; // Handle invalid date

  const pad = n => (n < 10 ? '0' + n : n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
