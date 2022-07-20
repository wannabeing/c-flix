import { useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieDetail,
  getMovies,
  IGetMovieDetail,
  IGetMovies,
} from "../apis/movieApis";
import Loader from "../components/Loader";
import MovieSlider from "../components/MovieSlider";
import { getPosterPath } from "../utils/utils";

const Wrapper = styled.div`
  height: 300vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
`;
const Banner = styled.div<{ posterPath: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 75vh;
  padding: 60px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.posterPath});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
const BannerTitle = styled.h2`
  display: flex;
  align-items: center;
  width: 80%;
  font-family: "Song Myung";
  font-weight: 800;
  font-size: 64px;
  margin-bottom: 20px;
  color: rgba(254, 211, 48, 0.8);
  text-shadow: 2px 2px 2px black;
  #vote {
    margin-left: 20px;
    color: ${(props) => props.theme.redColor};
    font-size: 40px;
  }
`;
const BannerOverview = styled.p`
  width: 55%;
  font-size: 18px;
  font-weight: 1000;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1;
`;
const BannerBtn = styled.div`
  font-family: "Do Hyeon";
  font-weight: 800;
  font-size: 18px;
  width: 150px;
  text-align: center;
  color: black;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  margin: 5px 0;
  padding: 5px;
  margin-top: 15px;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  &:hover {
    background-color: black;
    color: ${(props) => props.theme.boardColor};
  }
`;

function Movie() {
  // API 데이터 받아오기
  const { data: nowData, isLoading: nowLoading } = useQuery<IGetMovies>(
    ["movie", "now"],
    () => getMovies("now_playing")
  );
  const { data: popularData, isLoading: popularLoading } = useQuery<IGetMovies>(
    ["movie", "popular"],
    () => getMovies("popular")
  );
  const { data: topData, isLoading: topLoading } = useQuery<IGetMovies>(
    ["movie", "top"],
    () => getMovies("top_rated")
  );
  const { data: upData, isLoading: upLoading } = useQuery<IGetMovies>(
    ["movie", "upcoming"],
    () => getMovies("upcoming")
  );

  // 배너 API (마녀2)
  const { data: bannerData, isLoading: bannerLoading } =
    useQuery<IGetMovieDetail>(["movie", "banner"], () =>
      getMovieDetail(String(615173))
    );

  const history = useHistory();

  const moveBanner = (id: string) => {
    history.push(`/movie/${id}`);
  };

  // 불필요한 API 호출을 막음
  useEffect(() => {}, []);

  return (
    <Wrapper>
      {nowLoading &&
      popularLoading &&
      topLoading &&
      upLoading &&
      bannerLoading ? (
        <Loader />
      ) : (
        <>
          <Banner posterPath={getPosterPath(bannerData?.backdrop_path || "")}>
            <BannerTitle>
              <span>{bannerData?.title}</span>
              <span id="vote">★ {bannerData?.vote_average}</span>
            </BannerTitle>
            <BannerOverview>{bannerData?.overview}</BannerOverview>
            <BannerBtn onClick={() => moveBanner(bannerData?.id + "")}>
              자세히 보기
            </BannerBtn>
          </Banner>
          <MovieSlider kind="upcoming" data={upData} />
          <MovieSlider kind="now" data={nowData} />
          <MovieSlider kind="toprated" data={topData} />
          <MovieSlider kind="popular" data={popularData} />
        </>
      )}
    </Wrapper>
  );
}
export default Movie;
