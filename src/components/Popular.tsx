import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getMoviePopular, IGetMovies } from "../apis/movieApis";
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
/* const Slider = styled.div``;
const SliderTitle = styled.h2`
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 28px;
  text-shadow: 2px 2px 2px black;
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
}; */

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
  normal: {
    opacity: 0.3,
  },
  hover: {
    opacity: 0.7,
  },
};

function Popular() {
  const { data, isLoading } = useQuery<IGetMovies>(
    ["movies", "popular"],
    getMoviePopular
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

  /* ---------- Functions  ----------  */
  /* nextIndex(): 인덱스 증가시키는 함수  */
  /* prevIndex(): 인덱스 감소시키는 함수  */

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

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <Slider>
          <SliderTitle>Popular</SliderTitle>
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
                      key={movie.id}
                      posterpath={getPosterPath(
                        movie.backdrop_path
                          ? movie.backdrop_path
                          : movie.poster_path
                      )}
                    >
                      <span id="title">
                        {movie.title
                          ? movie.title.split(":", 1)
                          : movie.original_title.split(":", 1)}
                      </span>
                    </Box>
                  ))}
              </SliderRow>
            }
          </AnimatePresence>
          <PrevIcon
            src={prevImg}
            variants={IconVariants}
            initial="normal"
            whileHover="hover"
            onClick={prevIndex}
          />
          <NextIcon
            src={nextImg}
            variants={IconVariants}
            initial="normal"
            whileHover="hover"
            onClick={nextIndex}
          />
        </Slider>
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
