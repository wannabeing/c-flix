import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getMovieNowPlaying, IGetMovies } from "../apis/movieApis";
import * as S from "../styles/sliderComponent";
import { getPosterPath } from "../utils/utils";

const RowVariants: Variants = {
  hidden: {
    x: window.innerWidth - 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth + 10,
  },
};
const BoxVariants: Variants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.5,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};
const BoxInfoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

function Slider() {
  const { data, isLoading } = useQuery<IGetMovies>(
    ["movies", "nowPlay"],
    getMovieNowPlaying
  );
  console.log(data);

  const [index, setIndex] = useState(0);

  // 슬라이더 내에 박스의 애니메이션이 끝났는지 확인
  const [isLeave, setIsLeave] = useState(false);
  const toggleLeave = () => setIsLeave((prev) => !prev);

  // offset = 슬라이더 내에 한번에 보여주고 싶은 영화 개수
  const offset = 6;

  // 자동 슬라이드 기능
  // setTimeout(() => {
  //   plusIndex();
  // }, 15000);

  // history
  const history = useHistory();

  // Box 클릭 시, 실행되는 함수
  const boxClicked = (id: number) => {
    // 해당 URL로 이동
    history.push(`/movies/${id}`);
  };

  return (
    <S.Slider>
      <AnimatePresence initial={false} onExitComplete={toggleLeave}>
        {
          <>
            <S.SliderTitle>Now Playing</S.SliderTitle>
            <S.SliderRow
              key={index}
              variants={RowVariants}
              transition={{ type: "tween", duration: 1 }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {data?.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <S.Box
                    layoutId={movie.id + ""}
                    onClick={() => boxClicked(movie.id)}
                    key={movie.id}
                    variants={BoxVariants}
                    initial="normal"
                    transition={{ type: "tween" }}
                    whileHover="hover"
                    posterpath={getPosterPath(
                      movie.backdrop_path
                        ? movie.backdrop_path
                        : movie.poster_path
                    )}
                  >
                    {movie.title
                      ? movie.title.split(":", 1)
                      : movie.original_title.split(":", 1)}
                    <S.BoxInfo variants={BoxInfoVariants}>
                      <span id="vote">
                        ★ {movie.vote_average ? movie.vote_average : "정보없음"}
                      </span>
                      <span>개봉일: {movie.release_date}</span>
                    </S.BoxInfo>
                  </S.Box>
                ))}
            </S.SliderRow>
          </>
        }
      </AnimatePresence>
    </S.Slider>
  );
}
export default Slider;
