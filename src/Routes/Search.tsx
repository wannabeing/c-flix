import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IGetMovies } from "../apis/movieApis";
import {
  getSearchKey,
  getSearchMovie,
  getSearchTv,
  IGetSearchKey,
} from "../apis/searchApis";
import { IGetTv } from "../apis/tvApis";
import Loader from "../components/Loader";
import MovieSlider from "../components/movies/MovieSlider";
import TvSlider from "../components/tv/TvSlider";

const Wrapper = styled.div`
  margin-top: 80px;
  height: 100vh;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  height: 250px;
  color: white;
  margin-top: 20px;
  padding-top: 40px;
  padding-left: 20px;
`;
const Title = styled.h2``;

const KeyResult = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 10px;
`;
const Key = styled.div`
  margin: 10px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
`;
const Nothing = styled.div`
  margin-top: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

function Search() {
  // Header에서 보낸 query-argument를 파싱한다.
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  // 검색어 API 가져오기 (keyword가 존재할 때만)
  const { data: keyData, isLoading: keyLoading } = useQuery<IGetSearchKey>(
    ["search", "key"],
    () => getSearchKey(keyword!),
    { enabled: !!keyword }
  );
  const { data: movieData, isLoading: movieLoading } = useQuery<IGetMovies>(
    ["search", "movie"],
    () => getSearchMovie(keyword!),
    { enabled: !!keyword }
  );
  const { data: tvData, isLoading: tvLoading } = useQuery<IGetTv>(
    ["search", "tv"],
    () => getSearchTv(keyword!),
    { enabled: !!keyword }
  );

  return (
    <Wrapper>
      {keyLoading && movieLoading && tvLoading ? (
        <Loader />
      ) : (
        <>
          {keyData?.results.length &&
          movieData?.results.length &&
          tvData?.results.length ? (
            <>
              <Div>
                <Title>다음과 관련된 콘텐츠 &rarr;</Title>
                <KeyResult>
                  {keyData.results.slice(0, 18).map((key) => (
                    <Key key={key.id}>{key.name ? key.name : key.title}</Key>
                  ))}
                </KeyResult>
              </Div>
              <MovieSlider kind="search" data={movieData} />
              <TvSlider kind="search" data={tvData} />
            </>
          ) : (
            <Nothing>검색결과가 없습니다.</Nothing>
          )}
        </>
      )}
    </Wrapper>
  );
}
export default Search;
