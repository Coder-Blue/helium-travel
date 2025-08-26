export function formatDate(value: number | string) {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${day}-${month}-${year}`;
}
