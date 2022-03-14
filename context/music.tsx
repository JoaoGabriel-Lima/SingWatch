import React, { createContext, useState } from "react";

interface IContextProps {
  selectedMusic: any;
  setSelectedMusic: (music: any) => void;
  isSyncEnabled: any;
  setSyncEnabled: (isSyncEnabled: any) => void;
  seconds: number;
  setSeconds: (seconds: number) => void;
}

// ! Create Context and Context Provider for _app.tsx

const nowPlayingInitialState = {};

export const MusicContext = createContext({} as IContextProps);

export const MusicProvider = ({ children }: any) => {
  const [seconds, setSeconds] = React.useState(0);
  const [selectedMusic, setSelectedMusic] = useState(nowPlayingInitialState);
  const [isSyncEnabled, setSyncEnabled] = useState(false);
  return (
    <MusicContext.Provider
      value={{
        selectedMusic,
        setSelectedMusic,
        isSyncEnabled,
        setSyncEnabled,
        seconds,
        setSeconds,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
