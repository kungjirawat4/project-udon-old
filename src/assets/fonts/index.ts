// import { Inter as FontSans } from "next/font/google";
import localFont from 'next/font/local';

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const fontHeading = localFont({
  src: './BoonJot/BoonJot-Italic.woff2',
  variable: '--font-heading',
});

export const fontSatoshi = localFont({
  src: './ChakraPetch/ChakraPetch-Italic.woff2',
  variable: '--font-satoshi',
  weight: '300 900',
  display: 'swap',
  style: 'normal',
});

export const geistSans = localFont({
  src: './GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const geistMono = localFont({
  src: './GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const THSarabunNew = localFont({
  src: './THSarabunNew/THSarabunNew.ttf',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const THSarabun = localFont({
  src: './THSarabunNew/THSarabunNew Bold.ttf',
  variable: '--font-geist-mono',
  weight: '300 900',
});

// Load the font at the module scope
export const myFont = localFont({ src: './Noto/NotoSansThaiLooped-Medium.ttf' });
