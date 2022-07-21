const API_KEY = "ff60f073259513a99c48e8293fae4fa6";
const BASE_PATH = "https://api.themoviedb.org/3";

interface ISearchResult {
  id: number;
  name?: string;
  title?: string;
}

export interface IGetSearchKey {
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
}

export async function getSearchKey(keyword: string) {
  return await (
    await fetch(
      `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko&query=${keyword}&page=1&include_adult=false&region=KR`
    )
  ).json();
}

export async function getSearchMovie(keyword: string) {
  return await (
    await fetch(
      `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko&query=${keyword}&page=1&include_adult=false&region=KR`
    )
  ).json();
}
export async function getSearchTv(keyword: string) {
  return await (
    await fetch(
      `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko&&page=1&query=${keyword}&include_adult=false`
    )
  ).json();
}
