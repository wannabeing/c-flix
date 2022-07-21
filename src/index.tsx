import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { theme } from "./theme";
import { QueryClientProvider, QueryClient } from "react-query";
import { Helmet } from "react-helmet";

const Reset = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  *{
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: ${(props) => props.theme.textColor};
    line-height: 1;
    font-family: 'Oswald', sans-serif;
    font-weight: 400;
    font-size: 26px;
    overflow-x:hidden
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  hr {
    width:100%;
  }
 
`;

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <Reset />
          <Helmet>
            <title>C-FLIX</title>
          </Helmet>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </>
);
