import { motion, useAnimation, useScroll, Variants } from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

/* Styled Componenets */
const Nav = styled(motion.nav)`
  z-index: 99;
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
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  width: 80px;
  height: 80px;
  margin: 0 50px;
  cursor: pointer;
  path {
    fill: ${(props) => props.theme.cardColor};
  }
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li<any | null>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  transition: color 0.3s ease-in-out;
  cursor: pointer;
  font-size: 16px;
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
const Circle = styled(motion.span)`
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
const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 70px;
  svg {
    height: 20px;
    cursor: pointer;
  }
`;
const SearchSvg = styled(motion.svg)`
  stroke: white;
  stroke-width: 3px;
  fill-rule: nonzero;
  fill: rgb(100%, 100%, 100%);
  fill-opacity: 1;
`;
const SearchInput = styled(motion.input)`
  position: absolute;
  left: -140px;
  transform-origin: right center;
  border: none;
  border-radius: 7px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.06);
  font-size: 12px;
  padding: 5px;
`;

/* Variants */
const navVariants: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scrollDown: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  // 현재 위치(URL)와 같은지 알 수 있는 useRouterMatch() 함수
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  const searchMatch = useRouteMatch("/search");

  // 검색 아이콘을 눌렀는지 확인
  const [search, setSearch] = useState(false);

  // 검색 아이콘 클릭 시, 실행되는 함수
  const openSearch = () => {
    setSearch((prev) => !prev);
  };

  // 스크롤 감지
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 70) {
        navAnimation.start("scrollDown");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  // 검색기능
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const history = useHistory();

  // 검색어(keyword)를 입력했을 때 실행되는 함수 (query-argument를 보낸다.)
  const onSubmit = (data: IForm) => {
    history.push(`/search?keyword=${data.keyword}`);
    setValue("keyword", "");
  };

  return (
    <Nav variants={navVariants} animate={navAnimation}>
      <Column>
        <Link to="/c-flix">
          <Logo viewBox="0 -109.31 300 300" xmlns="http://www.w3.org/2000/svg">
            <g fill="#b81d24">
              <path d="M256.09 76.212c4.178.405 8.354.84 12.52 1.29l9.198-22.712 8.743 24.807c4.486.562 8.97 1.152 13.44 1.768l-15.328-43.501L299.996 0H287.01l-.135.186-8.283 20.455L271.32.003h-12.822l13.237 37.565-15.644 38.644zM246.393 75.322V0h-12.817v74.265c4.275.33 8.552.684 12.817 1.056M150.113 71.11c3.46 0 6.916.026 10.366.054V43.492h15.397V31.708H160.48v-19.91h17.733V0h-30.6v71.12c.831 0 1.666-.013 2.5-.01M110.319 71.83c4.27-.152 8.544-.28 12.824-.384V11.8h11.98V.003H98.339V11.8h11.982v60.03h-.002zM12.295 79.772V34.897L27.471 77.96c4.667-.524 9.341-1.017 14.028-1.483V.001H29.201v46.483L12.825.001H0v81.384h.077c4.063-.562 8.14-1.096 12.218-1.613M85.98 11.797V.001H55.377V75.202a1100.584 1100.584 0 0 1 30.578-2.211V61.184c-5.916.344-11.82.74-17.71 1.181V43.497h15.397V31.706H68.245V11.797H85.98zM203.614 60.62V-.003h-12.873v71.876c10.24.376 20.44.9 30.606 1.56V61.619c-5.9-.381-11.81-.712-17.733-1" />
            </g>
          </Logo>
        </Link>

        <Items>
          <Item isMatch={homeMatch}>
            <Link to="/c-flix">
              MOVIES {homeMatch?.isExact && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item isMatch={tvMatch}>
            <Link to="/c-flix/tv">
              TV SHOWS {tvMatch?.isExact && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item isMatch={searchMatch}>
            <Link to="/c-flix/search">
              SEARCH {searchMatch?.isExact && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Column>
      <Column>
        <Search onSubmit={handleSubmit(onSubmit)}>
          <SearchSvg
            onClick={openSearch}
            animate={{ x: search ? -180 : 0 }}
            transition={{ type: "linear" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <path d="M 21 3 C 11.601562 3 4 10.601562 4 20 C 4 29.398438 11.601562 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601562 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z M 21 7 " />
          </SearchSvg>
          <SearchInput
            animate={{ scaleX: search ? 1 : 0 }}
            transition={{ type: "linear" }}
            placeholder="검색어를 입력해주세요"
            {...register("keyword", { required: true, minLength: 3 })}
          />
        </Search>
      </Column>
    </Nav>
  );
}
export default Header;
