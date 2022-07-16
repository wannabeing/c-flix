import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieCredit,
  getMovieDetails,
  getMovies,
  IGetMovieCredit,
  IGetMovieDetail,
  IGetMovies,
} from "../apis/movieApis";
import { getPosterPath } from "../utils/utils";
import Loader from "./Loader";
import nextImg from "../assets/images/next1.png";
import prevImg from "../assets/images/prev1.png";

const Wrapper = styled.div`
  margin-top: 10%;
  width: 100%;
  height: 35vh;
  background-color: red;
`;
const Slider = styled.div`
  position: relative;
`;
const SliderTitle = styled.h2`
  background-color: blue;
  margin-bottom: 20px;
`;
const SliderRow = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  background-color: red;
`;
const Box = styled(motion.div)<{ posterpath: string }>`
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent),
    url(${(props) => props.posterpath});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Song Myung";
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  color: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  cursor: pointer;
  text-shadow: 2px 2px 2px black;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  #title {
    padding: 0 40px;
  }
  &:first-child {
    margin-left: 5px;
    transform-origin: center left;
  }
  &:last-child {
    margin-right: 5px;
    transform-origin: center right;
  }
`;
const BoxBottom = styled(motion.div)`
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

const PrevIcon = styled(motion.img)`
  position: absolute;
  width: 60px;
  top: 120px;
  left: 0;
  cursor: pointer;
`;
const NextIcon = styled(motion.img)`
  position: absolute;
  width: 60px;
  top: 120px;
  right: 0;
  cursor: pointer;
`;
const Modal = styled(motion.div)`
  position: absolute;
  width: 55vw;
  height: 80vh;
  top: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
  color: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  background-color: ${(props) => props.theme.textColor};
  /* 스크롤바 활성화 및 숨기기 */
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
const ModalPoster = styled.div<{ posterpath: string }>`
  border-radius: 12px 12px 0 0;
  height: 300px;
  background-color: white;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent),
    url(${(props) => props.posterpath});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Song Myung";
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  color: ${(props) => props.theme.boardColor};
  cursor: pointer;
  text-shadow: 2px 2px 2px black;
  #tagline {
    font-size: 20px;
  }
`;
const Genrs = styled.div`
  margin-top: 30px;
  font-family: "Nanum Myeongjo";
  text-shadow: none;
  font-size: 18px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  span {
    border-radius: 7px;
    padding: 5px;
    margin: 0 5px;
    background-color: ${(props) => props.theme.cardColor};
  }
`;
const ModalPrevInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 150px;
  padding: 5px 10px;
  text-align: center;
  font-size: 15px;
  margin-bottom: 10px;
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
const ModalCreditsInfo = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 30px;
`;
const ModalNextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  #title {
    font-size: 28px;
    color: grey;
    margin-bottom: 10px;
  }
  #name {
    margin-bottom: 20px;
  }
`;

const ModalInfoImg = styled.div<{ posterpath: string }>`
  background-image: url(${(props) => props.posterpath});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 0 10px;
`;
const ModalInfoCast = styled.div`
  display: flex;
  justify-content: center;
  #title {
    font-size: 28px;
    color: grey;
    margin-bottom: 10px;
  }
  #name {
    font-size: 14px;
  }
`;

const RowVariants: Variants = {
  hidden: (isNext: boolean) => {
    return {
      x: isNext ? window.innerWidth : -window.innerWidth,
    };
  },
  visible: {
    x: 0,
  },
  exit: (isNext: boolean) => {
    return {
      x: isNext ? -window.innerWidth : window.innerWidth,
    };
  },
};
const IconVariants: Variants = {
  initial: {
    opacity: 0.3,
  },
  hover: {
    opacity: 0.7,
  },
};
const BoxHoverVariants: Variants = {
  initial: { scale: 1 },
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
const BoxBottomVariants: Variants = {
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
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
  },
};

interface IKind {
  kindName: string;
}

function Popular({ kindName }: IKind) {
  const kind = kindName;

  let titleName;
  switch (kind) {
    case "popular":
      titleName = "popular";
      break;
    case "upcoming":
      titleName = "upcoming";
      break;
    case "top_rated":
      titleName = "top rated";
      break;
  }

  const [isBoxClicked, setBoxClicked] = useState(false);
  const [movieId, setMovieId] = useState("");

  const { data, isLoading } = useQuery<IGetMovies>(["movies", kind], () =>
    getMovies(kind)
  );

  const { data: detailData } = useQuery<IGetMovieDetail>(
    ["movies", `${kind}_detail`],
    () => getMovieDetails(movieId),
    { enabled: isBoxClicked }
  );
  const { data: creditData } = useQuery<IGetMovieCredit>(
    ["movies", `${kind}_credits`],
    () => getMovieCredit(movieId),
    { enabled: isBoxClicked }
  );

  // 슬라이더 인덱스
  const [index, setIndex] = useState(0);

  // 슬라이드 애니메이션 방향 설정
  const [isNext, setIsNext] = useState(true);

  // 슬라이드 내에 이동중인 애니메이션이 끝났는지 확인
  const [isLeave, setIsLeave] = useState(false);
  const toggleLeave = () => setIsLeave((prev) => !prev);

  // offset = 슬라이더 내에 한번에 보여주고 싶은 영화 개수
  const offset = 6;

  // Box 클릭 시, url 이동하기 위해 (모달창)
  const history = useHistory();
  // Box를 클릭했는지 확인 (해당 url 이동)
  const movieMatch = useRouteMatch<{ id: string; kind: string }>(
    "/movie/:kind/:id"
  );

  // 기존에 갖고 있던 data를 Modal에 전달
  const prevMovieInfo =
    movieMatch?.params.id &&
    data?.results.find((movie) => String(movie.id) === movieMatch.params.id);

  // 감독 정보
  const Directing = creditData?.crew.find(
    (people) => people.known_for_department === "Directing"
  );
  // 출연징 정보 (3명)
  const Casting = creditData?.cast.slice(0, 3);

  /* ---------- Functions  ----------  */
  /* nextIndex(): 인덱스 증가시키는 함수  */
  /* prevIndex(): 인덱스 감소시키는 함수  */
  /* clickBox(): 박스(슬라이드)를 클릭했을 때 실행되는 함수  */
  /* clickOverlay(): 오버레이 클릭 시, 이전 페이지로 이동하는 함수  */

  const nextIndex = () => {
    if (data) {
      // 애니메이션 아직 안끝남
      if (isLeave) return;
      else {
        // API data.length
        const mvLength = data.results.length;
        const maxIndex = Math.floor(mvLength / offset);

        toggleLeave();
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        setIsNext(() => true);
      }
    }
  };
  const prevIndex = () => {
    if (data) {
      // 애니메이션 아직 안끝남
      if (isLeave) return;
      else {
        // API data.length
        const mvLength = data.results.length;
        const maxIndex = Math.ceil(mvLength / offset);

        toggleLeave();
        setIndex((prev) => (prev === 0 ? maxIndex - 1 : prev - 1));
        setIsNext(() => false);
      }
    }
  };
  const clickBox = (id: number, kind: string) => {
    setBoxClicked(true);
    setMovieId(id + "");

    // 모달창으로 이동
    history.push(`/movie/${kind}/${id}`);
  };
  const clickOverlay = () => {
    setBoxClicked(false);
    history.goBack();
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Slider>
            <SliderTitle>{titleName?.toUpperCase()}</SliderTitle>
            {/* Slilder */}
            <AnimatePresence
              custom={isNext}
              onExitComplete={toggleLeave}
              initial={false}
            >
              {
                <SliderRow
                  key={index}
                  transition={{ type: "tween", duration: 1 }}
                  variants={RowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={isNext}
                >
                  {data?.results
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        onClick={() => clickBox(movie.id, kind)}
                        key={movie.id}
                        posterpath={getPosterPath(
                          movie.backdrop_path
                            ? movie.backdrop_path
                            : movie.poster_path
                        )}
                        variants={BoxHoverVariants}
                        initial="initial"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        layoutId={`${movie.id}_${kind}`}
                      >
                        <span id="title">
                          {movie.title
                            ? movie.title.split(":", 1)
                            : movie.original_title.split(":", 1)}
                        </span>
                        <BoxBottom variants={BoxBottomVariants}>
                          <span id="vote">
                            ★{" "}
                            {movie.vote_average
                              ? movie.vote_average
                              : "정보없음"}
                          </span>
                          <span>개봉일: {movie.release_date}</span>
                        </BoxBottom>
                      </Box>
                    ))}
                </SliderRow>
              }
            </AnimatePresence>
            <PrevIcon
              src={prevImg}
              variants={IconVariants}
              initial="initial"
              whileHover="hover"
              onClick={prevIndex}
            />
            <NextIcon
              src={nextImg}
              variants={IconVariants}
              initial="initial"
              whileHover="hover"
              onClick={nextIndex}
            />
          </Slider>
          {/* Modal */}
          <AnimatePresence>
            {movieMatch ? (
              <>
                <Overlay
                  onClick={clickOverlay}
                  variants={OverlayVariants}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                >
                  <Modal
                    key={index}
                    layoutId={`${movieMatch.params.id}_${kind}`}
                  >
                    {prevMovieInfo && (
                      <>
                        <ModalPoster
                          posterpath={getPosterPath(
                            prevMovieInfo.backdrop_path
                              ? prevMovieInfo.backdrop_path
                              : prevMovieInfo.poster_path
                          )}
                        >
                          <span id="title">{prevMovieInfo.title}</span>
                          <span id="tagline">{detailData?.tagline}</span>
                          <Genrs>
                            {detailData?.genres.map((genre) => (
                              <span key={genre.id} id="genrs">
                                {genre.name}
                              </span>
                            ))}
                          </Genrs>
                        </ModalPoster>

                        <ModalPrevInfo>
                          <span id="star">★</span>
                          <span id="star">
                            {prevMovieInfo.vote_average
                              ? prevMovieInfo.vote_average
                              : "0.0"}
                          </span>
                          <span>{prevMovieInfo.overview}</span>
                        </ModalPrevInfo>

                        <ModalCreditsInfo>
                          <ModalNextInfo>
                            <span id="title">Director</span>
                            <ModalInfoImg
                              posterpath={getPosterPath(
                                Directing?.profile_path
                                  ? Directing?.profile_path
                                  : ""
                              )}
                            />
                            <span id="name">{Directing?.original_name}</span>
                          </ModalNextInfo>

                          <ModalInfoCast>
                            {Casting?.map((Cast) => (
                              <ModalNextInfo key={Cast.id}>
                                <span id="title">Actor</span>
                                <ModalInfoImg
                                  posterpath={getPosterPath(
                                    Cast?.profile_path ? Cast?.profile_path : ""
                                  )}
                                />
                                <span id="name">{Cast?.original_name}</span>
                              </ModalNextInfo>
                            ))}
                          </ModalInfoCast>
                        </ModalCreditsInfo>
                      </>
                    )}
                  </Modal>
                </Overlay>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );

  /* const { data, isLoading } = useQuery<INowPlaying>(
    ["movies", "popular"],
    getMoviePopular
  );
  console.log(data);

  // 슬라이더 내에 박스의 애니메이션이 끝났는지 확인
  const [isLeave, setIsLeave] = useState(false);
  const toggleLeave = () => setIsLeave((prev) => !prev);

  const [index, setIndex] = useState(0);

  // offset = 슬라이더 내에 한번에 보여주고 싶은 영화 개수
  const offset = 6;
  // history
  const history = useHistory();
  // Box 클릭 시, 실행되는 함수
  const boxClicked = (id: number) => {
    // 해당 URL로 이동
    history.push(`/movies/${id}`);
  };

  return (
    <Wrapper>
      <SliderTitle>Popular</SliderTitle>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeave}>
          {
            <>
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
                          {movie.vote_average ? movie.vote_average : "정보없음"}
                        </span>
                        <span>개봉일: {movie.release_date}</span>
                      </BoxInfo>
                    </Box>
                  ))}
              </SliderRow>
            </>
          }
        </AnimatePresence>
      </Slider>
    </Wrapper>
  ); */
}
export default Popular;
