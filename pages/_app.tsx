/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import "../styles/globals.css";
// import type { AppProps } from "next/app";
import React from "react";
// import { AppProps } from "next/app";
import { MusicProvider } from "../context/music";

import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MusicProvider>
      <Component {...pageProps} />
    </MusicProvider>
  );
}

export default MyApp;
