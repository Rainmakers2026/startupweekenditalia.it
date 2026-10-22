import { Mona_Sans, Stack_Sans_Notch } from "next/font/google";

export const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  display: "swap",
  preload: false,
});

export const stackSansNotch = Stack_Sans_Notch({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-stack-sans-notch",
  display: "swap",
});
