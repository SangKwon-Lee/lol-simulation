import { css, SerializedStyles } from 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: {
      default: string;
      color10: string;
      color20: string;
      color30: string;
      color40: string;
      color50: string;
      color60: string;
      color70: string;
      color80: string;
      color90: string;
    };
    border: {
      default: string;
      color10: string;
      color20: string;
    };
    bg: {
      default: string;
      color10: string;
      color20: string;
      color30: string;
      shadow: string;
    };
    textSize: {
      S12W400: SerializedStyles;
      S12W500: SerializedStyles;
      S12W700: SerializedStyles;
      S14W400: SerializedStyles;
      S14W500: SerializedStyles;
      S14W700: SerializedStyles;
      S16W400: SerializedStyles;
      S16W500: SerializedStyles;
      S16W700: SerializedStyles;
      S18W400: SerializedStyles;
      S18W500: SerializedStyles;
      S18W700: SerializedStyles;
      S20W400: SerializedStyles;
      S20W500: SerializedStyles;
      S20W700: SerializedStyles;
      S28W400: SerializedStyles;
      S28W500: SerializedStyles;
      S28W700: SerializedStyles;
      S32W400: SerializedStyles;
      S32W500: SerializedStyles;
      S32W700: SerializedStyles;
    };
  }
}
