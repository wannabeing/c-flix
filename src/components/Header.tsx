import { useAnimation, useScroll, Variants } from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "../styles/headerComponent";

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
  // 현재 위치와 같은지 알 수 있는 useRouterMatch() 함수
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");

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
  const { register, handleSubmit } = useForm<IForm>();
  const history = useHistory();
  const onValid = (data: IForm) => {
    console.log(data);
    history.push(`/search?keyword=${data.keyword}`);
  };

  return (
    <S.Nav variants={navVariants} animate={navAnimation}>
      <S.Column>
        <S.Logo viewBox="0 -109.31 300 300" xmlns="http://www.w3.org/2000/svg">
          <g fill="#b81d24">
            <path d="M256.09 76.212c4.178.405 8.354.84 12.52 1.29l9.198-22.712 8.743 24.807c4.486.562 8.97 1.152 13.44 1.768l-15.328-43.501L299.996 0H287.01l-.135.186-8.283 20.455L271.32.003h-12.822l13.237 37.565-15.644 38.644zM246.393 75.322V0h-12.817v74.265c4.275.33 8.552.684 12.817 1.056M150.113 71.11c3.46 0 6.916.026 10.366.054V43.492h15.397V31.708H160.48v-19.91h17.733V0h-30.6v71.12c.831 0 1.666-.013 2.5-.01M110.319 71.83c4.27-.152 8.544-.28 12.824-.384V11.8h11.98V.003H98.339V11.8h11.982v60.03h-.002zM12.295 79.772V34.897L27.471 77.96c4.667-.524 9.341-1.017 14.028-1.483V.001H29.201v46.483L12.825.001H0v81.384h.077c4.063-.562 8.14-1.096 12.218-1.613M85.98 11.797V.001H55.377V75.202a1100.584 1100.584 0 0 1 30.578-2.211V61.184c-5.916.344-11.82.74-17.71 1.181V43.497h15.397V31.706H68.245V11.797H85.98zM203.614 60.62V-.003h-12.873v71.876c10.24.376 20.44.9 30.606 1.56V61.619c-5.9-.381-11.81-.712-17.733-1" />
          </g>
        </S.Logo>

        {/* <Logo
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M303.7 96.2c11.1-11.1 115.5-77 139.2-53.2 23.7 23.7-42.1 128.1-53.2 139.2-11.1 11.1-39.4.9-63.1-22.9-23.8-23.7-34.1-52-22.9-63.1zM109.9 68.1C73.6 47.5 22 24.6 5.6 41.1c-16.6 16.6 7.1 69.4 27.9 105.7 18.5-32.2 44.8-59.3 76.4-78.7zM406.7 174c3.3 11.3 2.7 20.7-2.7 26.1-20.3 20.3-87.5-27-109.3-70.1-18-32.3-11.1-53.4 14.9-48.7 5.7-3.6 12.3-7.6 19.6-11.6-29.8-15.5-63.6-24.3-99.5-24.3-119.1 0-215.6 96.5-215.6 215.6 0 119 96.5 215.6 215.6 215.6S445.3 380.1 445.3 261c0-38.4-10.1-74.5-27.7-105.8-3.9 7-7.6 13.3-10.9 18.8z" />
        </Logo> */}
        <S.Items>
          <S.Item isMatch={homeMatch}>
            <Link to="">
              MOVIES {homeMatch?.isExact && <S.Circle layoutId="circle" />}
            </Link>
          </S.Item>
          <S.Item isMatch={tvMatch}>
            <Link to="/tv">
              TV SHOWS {tvMatch && <S.Circle layoutId="circle" />}
            </Link>
          </S.Item>
        </S.Items>
      </S.Column>
      <S.Column>
        <S.Search onSubmit={handleSubmit(onValid)}>
          <S.SearchSvg
            onClick={openSearch}
            animate={{ x: search ? -180 : 0 }}
            transition={{ type: "linear" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <path d="M 21 3 C 11.601562 3 4 10.601562 4 20 C 4 29.398438 11.601562 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601562 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z M 21 7 " />
          </S.SearchSvg>
          {/* 검은색 돋보기 
          <motion.svg
            onClick={openSearch}
            animate={{ x: search ? -170 : 0 }}
            transition={{ type: "linear" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
          </motion.svg> */}
          <S.SearchInput
            animate={{ scaleX: search ? 1 : 0 }}
            transition={{ type: "linear" }}
            placeholder="검색어를 입력해주세요"
            {...register("keyword", { required: true, minLength: 2 })}
          />
        </S.Search>
      </S.Column>
    </S.Nav>
  );
}
export default Header;
