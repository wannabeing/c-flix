import { motion } from "framer-motion";
import styled from "styled-components";

export const FirstSlider = styled.div`
  position: relative;
  top: -150px;
`;
export const Slider = styled.div``;
export const SliderTitle = styled.h2`
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 28px;
  text-shadow: 2px 2px 2px black;
`;
export const SliderRow = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 12px;
  padding: 0 10px;
`;
export const Box = styled(motion.div)<{ posterpath: string }>`
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
export const BoxInfo = styled(motion.div)`
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
export const Overlay = styled(motion.div)<{ height: string }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${(props) => props.height};
  background-color: rgba(0, 0, 0, 0.7);
`;
export const Modal = styled(motion.div)`
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
export const ModalPoster = styled.div<{ posterpath: string }>`
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
export const ModalInfo = styled.div`
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
