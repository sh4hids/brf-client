import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize};
    background-color: ${({ theme }) => theme.colors.light};
    min-height: 100vh;
  }
  p {
    line-height: 1.45;
    font-size: 1em;
    margin: 0;
    padding: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.15;
  }
  h1 {
    font-size: 3.052em;
  }
  h2 {
    font-size: 2.441em;
  }
  h3 {
    font-size: 1.953em;
  }
  h4 {
    font-size: 1.563em;
  }
  h5 {
    font-size: 1.25em;
  }
  h6 {
    font-size: 1em;
  }
  :not(pre) > code[class*="language-"], pre[class*="language-"] {
    background-color: #f0f8fb;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
