import type { AppProps } from "next/app";

import "tailwindcss/tailwind.css";
import "../styles/global.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
