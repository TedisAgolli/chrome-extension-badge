import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        data-goatcounter="https://badge.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
