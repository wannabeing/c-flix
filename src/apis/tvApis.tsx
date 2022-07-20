const API_KEY = "ff60f073259513a99c48e8293fae4fa6";
const BASE_PATH = "https://api.themoviedb.org/3";

interface ITv {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  poster_path: string;
}

export interface IGetTv {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvDetail {
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  overview: string;
  vote_average: number;
  id: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  last_episode_to_air: {
    air_date: string;
    name: string;
    episode_number: number;
  };
  next_episode_to_air: {
    air_date: string;
    name: string;
    episode_number: number;
  };
}
export interface IGetTvCredit {
  id: number;
  cast: [
    {
      id: number;
      name: string;
      original_name: string;
      character: string;
      profile_path: string;
    }
  ];
  crew: [
    {
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      profile_path: string;
    }
  ];
}
export async function getTv(kind: string) {
  return await (
    await fetch(`${BASE_PATH}/tv/${kind}?api_key=${API_KEY}&language=ko&page=1`)
  ).json();
}

export async function getTvDetail(id: string) {
  return await (
    await fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko`)
  ).json();
}
export async function getTvCredit(id: string) {
  return await (
    await fetch(`${BASE_PATH}/tv/${id}/credits?api_key=${API_KEY}&language=ko`)
  ).json();
}
