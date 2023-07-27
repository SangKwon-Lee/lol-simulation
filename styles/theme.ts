import { DefaultTheme, css } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  textColor: {
    default: '#F9E5BF',
    color10: '#2e2e2e',
    color20: '#404040',
    color30: '#595959',
    color40: '#737373',
    color50: '#8c8c8c',
    color60: '#a6a6a6',
    color70: '#bfbfbf',
    color80: '#d9d9d9',
    color90: '#f2f2f2'
  },
  border: {
    default: '#bfbfbf',
    color10: '#595959',
    color20: '#f2f2f2'
  },
  bg: {
    default: '#151A20',
    color10: '404040',
    color20: '404040',
    color30: '2b2b2b',
    shadow: 'rgb(255 255 255 /10%)'
  },
  textSize: {
    S12W400: css`
      font-style: normal;
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 100%;
    `,
    S12W500: css`
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 120%;
    `,

    S12W700: css`
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 120%;
    `,

    S14W400: css`
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 120%;
    `,

    S14W500: css`
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 120%;
    `,

    S14W700: css`
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 120%;
    `,

    S16W400: css`
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 120%;
    `,

    S16W500: css`
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 120%;
    `,

    S16W700: css`
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 120%;
    `,

    S18W400: css`
      font-size: 1.8rem;
      font-weight: 400;
      line-height: 120%;
    `,

    S18W500: css`
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 120%;
    `,

    S18W700: css`
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 120%;
    `,

    S20W400: css`
      font-size: 2rem;
      font-weight: 400;
      line-height: 140%;
    `,

    S20W500: css`
      font-size: 2rem;
      font-weight: 500;
      line-height: 140%;
    `,

    S20W700: css`
      font-size: 2rem;
      font-weight: 700;
      line-height: 140%;
    `,

    S28W400: css`
      font-size: 2.8rem;
      font-weight: 400;
      line-height: 160%;
    `,

    S28W500: css`
      font-size: 2.8rem;
      font-weight: 500;
      line-height: 160%;
    `,

    S28W700: css`
      font-size: 2.8rem;
      font-weight: 700;
      line-height: 160%;
    `,

    S32W400: css`
      font-size: 3.2rem;
      font-weight: 400;
      line-height: 160%;
    `,
    S32W500: css`
      font-size: 3.2rem;
      font-weight: 500;
      line-height: 160%;
    `,
    S32W700: css`
      font-size: 3.2rem;
      font-weight: 700;
      line-height: 160%;
    `
  }
};
