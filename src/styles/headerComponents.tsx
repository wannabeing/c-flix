import { motion } from "framer-motion";
import styled from "styled-components";

export const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  font-size: 14px;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
export const Column = styled.div`
  display: flex;
  align-items: center;
`;
export const Logo = styled(motion.svg)`
  width: 80px;
  height: 80px;
  margin: 0 50px;
  cursor: pointer;
  path {
    fill: ${(props) => props.theme.cardColor};
  }
`;
export const Items = styled.ul`
  display: flex;
  align-items: center;
`;
export const Item = styled.li<any | null>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  transition: color 0.3s ease-in-out;
  cursor: pointer;
  color: ${(props) =>
    props.isMatch
      ? props.isMatch.isExact
        ? props.theme.cardColor
        : props.theme.boardColor
      : props.theme.boardColor};
  &:hover {
    color: ${(props) => props.theme.cardColor};
  }
`;
export const Circle = styled(motion.span)`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  bottom: -10px;
  right: 0;
  left: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.redColor};
`;
export const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 70px;
  svg {
    height: 20px;
    cursor: pointer;
  }
`;
export const SearchSvg = styled(motion.svg)`
  stroke: white;
  stroke-width: 3px;
  fill-rule: nonzero;
  fill: rgb(100%, 100%, 100%);
  fill-opacity: 1;
`;
export const SearchInput = styled(motion.input)`
  position: absolute;
  left: -140px;
  transform-origin: right center;
  border: none;
  border-radius: 7px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.06);
  font-size: 12px;
  padding: 5px;
`;
