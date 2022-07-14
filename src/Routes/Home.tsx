import {
  AnimatePresence,
  motion,
  useViewportScroll,
  Variants,
} from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovieNowPlaying, INowPlaying } from "../api";
import { getPosterPath } from "../utils";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;
const Banner = styled.div<{ posterPath: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.8)
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

const Slider = styled.div`
  position: relative;
  top: -150px;
`;
const SliderRow = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 12px;
  padding: 0 10px;
`;
const Box = styled(motion.div)<{ posterpath: string }>`
  background-image: url(${(props) => props.posterpath});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Song Myung";
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  color: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  cursor: pointer;
  text-shadow: 2px 2px 2px black;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const BoxInfo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.textColor};
  opacity: 0;
  span {
    text-align: center;
    margin: 2px 0;
    font-size: 12px;
    font-weight: 600;
    font-family: "돋움";
    text-shadow: none;
  }
  #vote {
    font-weight: 800;
    font-size: 16px;
    color: ${(props) => props.theme.redColor};
  }
`;
const Overlay = styled(motion.div)<{ height: string }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${(props) => props.height};
  background-color: rgba(0, 0, 0, 0.7);
`;
const Modal = styled(motion.div)`
  position: absolute;
  width: 55vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  color: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  background-color: ${(props) => props.theme.textColor};
`;
const ModalPoster = styled.div<{ posterpath: string }>`
  border-radius: 12px 12px 0 0;
  height: 300px;
  background-color: white;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent),
    url(${(props) => props.posterpath});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Song Myung";
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  color: ${(props) => props.theme.boardColor};
  cursor: pointer;
  text-shadow: 2px 2px 2px black;
`;
const ModalInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 5px 10px;
  text-align: center;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    margin-right: 10px;
  }
  #star {
    font-size: 22px;
    color: ${(props) => props.theme.redColor};
    &:first-child {
      margin-right: 3px;
    }
  }
`;

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
const OverlayVariants: Variants = {
  normal: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
  },
};

function Home() {
  const { data, isLoading } = useQuery<INowPlaying>(
    ["movies", "nowPlay"],
    getMovieNowPlaying
  );

  const [index, setIndex] = useState(0);
  const plusIndex = () => {
    if (data) {
      // 애니메이션 아직 안끝남
      if (isLeave) return;

      // 애니메이션 끝났을 때 state 토글
      toggleLeave();
      // 슬라이더 내 영화정보 몇개인지, 몇페이지까지 슬라이더를 생성할껀지 결정
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

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
  // 해당 URL에 있는지 확인
  const movieMatch = useRouteMatch<{ id: string }>("/movies/:id");

  // Box 클릭 시, 실행되는 함수
  const boxClicked = (id: number) => {
    // 해당 URL로 이동
    history.push(`/movies/${id}`);
  };

  // Overlay 컴포넌트 클릭 시, 실행되는 함수
  const overlayClicked = () => {
    history.goBack();
  };
  // 해당 위치의 y좌표를 알기 위해서
  const { scrollY } = useViewportScroll();

  // API를 통해 받은 정보를 modal창에 전달하기
  const findMovieInfo =
    movieMatch?.params.id &&
    data?.results.find((movie) => String(movie.id) === movieMatch.params.id);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로더띄우자</Loader>
      ) : (
        <>
          <Banner
            onClick={plusIndex}
            posterPath={getPosterPath(data?.results[0].backdrop_path || "")}
          >
            <BannerTitle>
              <span>{data?.results[0].title}</span>
              <span id="vote">★ {data?.results[0].vote_average}</span>
            </BannerTitle>
            <BannerOverview>{data?.results[0].overview}</BannerOverview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeave}>
              {
                <SliderRow
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
                      <Box
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
                        <BoxInfo variants={BoxInfoVariants}>
                          <span id="vote">
                            ★{" "}
                            {movie.vote_average
                              ? movie.vote_average
                              : "정보없음"}
                          </span>
                          <span>개봉일: {movie.release_date}</span>
                        </BoxInfo>
                      </Box>
                    ))}
                </SliderRow>
              }
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {movieMatch ? (
              <>
                <Overlay
                  onClick={overlayClicked}
                  height={window.outerHeight + "px"}
                  variants={OverlayVariants}
                  initial="normal"
                  animate="visible"
                  exit="exit"
                />
                <Modal
                  layoutId={movieMatch.params.id}
                  style={{ top: scrollY.get() + 100 }}
                  transition={{ duration: 0.5 }}
                >
                  {findMovieInfo && (
                    <>
                      <ModalPoster
                        posterpath={getPosterPath(
                          findMovieInfo.backdrop_path
                            ? findMovieInfo.backdrop_path
                            : findMovieInfo.poster_path
                        )}
                      >
                        <span id="title">{findMovieInfo.title}</span>
                      </ModalPoster>
                      <ModalInfo>
                        <span id="star">★</span>
                        <span id="star">
                          {findMovieInfo.vote_average
                            ? findMovieInfo.vote_average
                            : "0.0"}
                        </span>
                        <span>{findMovieInfo.overview}</span>
                      </ModalInfo>
                    </>
                  )}
                </Modal>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
