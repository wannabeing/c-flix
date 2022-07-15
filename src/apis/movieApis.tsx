const API_KEY = "ff60f073259513a99c48e8293fae4fa6";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  overview: string;
  release_date: string;
  poster_path: string;
  original_title: string;
  title?: string;
  vote_average: string;
}

export interface IGetMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getMovieNowPlaying() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
  ).json();
}
export async function getMoviePopular() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
  ).json();
}
