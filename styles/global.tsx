import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    padding: 0;
    border: 0;
    margin: 0;
    appearance: none;
    -webkit-appearence: none;
    background-color: #040a14;
    border-collapse: collapse;
    color: #f9e5bf;
    font-feature-settings: 'pnum' on, 'lnum' on, 'calt' off, 'cv13' on !important;
    font-size: 10px;
    letter-spacing: -0.01em;
    vertical-align: baseline;
  }
  body {
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: none;
  }

  /* remember to define visible focus styles!
  :focus{outline:?????;}
   */

  /* remember to highlight inserts somehow! */
  ins {
    text-decoration: none;
  }

  del {
    text-decoration: line-through;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: normal;
  }

  a {
    display: inline-block;
    text-decoration: none;
  }

  a:link,
  a:visited,
  a:active {
    color: #f9e5bf;
    text-decoration: none;
  }

  caption,
  legend {
    display: none;
  }

  button {
    box-sizing: inherit;
    padding: 0;
    border: 0;
    margin: 0;
    background: none;
    cursor: pointer;
  }

  em {
    font-style: normal;
  }

  /* input disabled ios 기본 css reset */
  input[type='checkbox'],
  input[type='radio'] {
    &:disabled {
      & + label {
        cursor: default;
      }
    }
  }

  input[type='text'],
  input[type='number'],
  input[type='password'],
  input[type='email'],
  textarea {
    padding: 0;
    appearance: none;

    &:disabled {
      opacity: 1;
      -webkit-text-fill-color: inherit;
    }

    &::-ms-clear,
    &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }
  }

  select {
    position: relative;
    appearance: none;

    /* 사파리, 크롬 하위버전용 */

    /* 사파리, 크롬 하위버전용 */
    &::-ms-expand {
      display: none;
    }
  }

  input[type='text']::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }

  // input number 버튼 삭제
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }

  img {
    display: block;
    image-rendering: crisp-edges;
    image-rendering: optimize-contrast;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -ms-interpolation-mode: nearest-neighbor;
  }

  div,
  button,
  span,
  a {
    image-rendering: crisp-edges;
    image-rendering: optimize-contrast;
  } // 백그라운드 이미지 랜더링 css

  // ios video border
  video {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-image: radial-gradient(white, black);
    mask-image: radial-gradient(white, black);
  }

  .main{
  display: flex;
  flex:1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:0 16px;
  }
`;
