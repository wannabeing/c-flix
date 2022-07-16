export function getPosterPath(id: string, format?: string) {
  if (id === "") return "";
  return `https://image.tmdb.org/t/p/${format ? format : "original"}${id}`;
}
