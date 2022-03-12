/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import { HomeCointainer } from "../styles/components/home";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import MusicCardSelector from "./components/MusicSelectorCard";
import { RiLoader4Fill } from "react-icons/ri";
import Link from "next/link";
import MusicHistoryCard from "./components/MusicHistoryCard";
import { ThemeProvider } from "styled-components";
import DiscordSyncCard from "./components/discordSyncCard";
import { MusicContext } from "../context/music";
// import DiscordSyncCard from "./components/discordSyncCar

const Home: NextPage = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [musicList, setMusicList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingLyrics, setIsLoadingLyrics] = React.useState(false);
  const [musicLyric, setMusicLyric] = React.useState("");
  const [lyricsError, setLyricsError] = React.useState(true);
  const [musicHistory, setMusicHistory]: any = React.useState([]);
  const [selectedColor, setSelectedColor] = React.useState("#2757a0");
  const [selecttextcolor, setSelecttextcolor] = React.useState(false);
  const [provider, setProvider] = React.useState("SingWatch Lyrics");

  const { selectedMusic, setSelectedMusic } = useContext(MusicContext);

  const colors = [
    "#5c6d81",
    "#157f94",
    "#938526",
    "#8c9590",
    "#c84095",
    "#d06071",
    "#9e7b60",
    "#c07442",
    "#a6412f",
    "#ca203a",
    "#c9841d",
    "#867bc9",
  ];

  const texts = [
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    true,
    true,
  ];

  useEffect(() => {
    if (typeof window === "object") {
      if (localStorage.getItem("musicHistory") !== null) {
        setMusicHistory(
          JSON.parse(localStorage.getItem("musicHistory") || "[]")
        );
        const musicData = JSON.parse(
          localStorage.getItem("musicHistory") || "[]"
        );
        if (musicData.length > 0) {
          setSelectedMusic(musicData[0]);
        }
      }
    }
  }, []);

  useEffect(() => {
    const musicColorDecied = Math.floor(Math.random() * colors.length);
    setSelectedColor(colors[musicColorDecied]);
    setSelecttextcolor(texts[musicColorDecied]);
    // find index of selected color in colors array and set text color

    setLyricsError(false);
    setIsLoadingLyrics(true);
    setProvider("SingWatch Lyrics");
    // console.log(selectedMusic);
    const musictoFind = selectedMusic;
    if (musictoFind.author != undefined || musictoFind.title != undefined) {
      axios
        .get(
          `https://api.lyrics.ovh/v1/${musictoFind.author}/${musictoFind.title}`
        )
        .then((res) => {
          if (res.status === 200) {
            setMusicLyric(res.data.lyrics);
            setIsLoadingLyrics(false);
            setLyricsError(false);
          }
        })
        .catch((err) => {
          setProvider("Genius Lyrics");
          axios
            .post("/api/lyrics", {
              author: musictoFind.author,
              title: musictoFind.title,
            })
            .then((res) => {
              if (res.status === 200) {
                if (res.data.lyrics != null) {
                  setMusicLyric(res.data.lyrics);
                  setIsLoadingLyrics(false);
                  setLyricsError(false);
                } else {
                  setLyricsError(true);
                  setIsLoadingLyrics(false);
                }
              }
            })
            .catch((err) => {
              setIsLoadingLyrics(false);
              setLyricsError(true);
            });
        });
    }
  }, [selectedMusic]);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      if (inputValue.trim() !== "") {
        axios
          .get(
            `https://cors.jg-limamarinho202.workers.dev/?https://api.deezer.com/search?q=${encodeURI(
              inputValue
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )}`,
            {
              headers: { "Access-Control-Allow-Origin": "*" },
            }
          )
          .then((res) => {
            setMusicList(res.data.data.slice(0, 3));
            setIsLoading(false);
          });
      }
    };
    const timer = setTimeout(() => {
      if (inputValue) getData();
    }, 700);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleMusicClick = (
    author: string,
    title: string,
    album: string,
    cover: string
  ) => {
    handleMusicHistory(author, title, cover, album);
    setSelectedMusic({ author, title, album, cover });
    setInputValue("");
  };

  const handleMusicHistory = (
    author: any,
    title: any,
    cover: any,
    album: any
  ) => {
    const exists = musicHistory.find(
      (music: any) => music.author === author && music.title === title
    );
    if (!exists) {
      const newMusicHistory: any = [
        { author, title, album, cover },
        ...musicHistory,
      ];
      localStorage.setItem("musicHistory", JSON.stringify(newMusicHistory));
      setMusicHistory(newMusicHistory);
    }
  };

  const handleMusicHistorySelect = (i: any) => {
    // move to the top of the list
    const newMusicHistory: any = [
      musicHistory[i],
      ...musicHistory.slice(0, i),
      ...musicHistory.slice(i + 1),
    ];
    localStorage.setItem("musicHistory", JSON.stringify(newMusicHistory));
    setMusicHistory(newMusicHistory);

    setSelectedMusic(musicHistory[i]);
    setInputValue("");
  };

  const handleMusicHistoryDelete = (i: any) => {
    const newMusicHistory: any = [
      ...musicHistory.slice(0, i),
      ...musicHistory.slice(i + 1),
    ];
    localStorage.setItem("musicHistory", JSON.stringify(newMusicHistory));
    setMusicHistory(newMusicHistory);
  };

  const theme = {
    colors: selectedColor,
    error: lyricsError,
    textColor: selecttextcolor,
  };

  return (
    <ThemeProvider theme={theme}>
      <HomeCointainer>
        <Head>
          <title>SingWatch - Home</title>
          <meta
            name="description"
            content="SingWatch is an open source project that aims to find song lyrics without difficulties, after all who doesn't like to know how to sing their favorite song?"
          />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          ></link>
        </Head>
        <main className="flex items-center flex-col">
          <div className="w-[90%] max-w-[1000px] flex justify-center flex-col">
            <div className="">
              <div className="mt-10 flex justify-center flex-col items-center">
                <h1 className="text-[#ffffff] font-bold text-[2rem]">
                  Sing
                  <span className="text-[#2A79EF] font-extrabold">Watch</span>
                </h1>
                <h3 className="mt-2 text-[14.5px] font-normal w-[100%] text-center text-white/90">
                  Find lyrics in a second without any delay
                </h3>
              </div>
              <div
                className="mt-5 rounded-[10px] flex items-center justify-between border-[2px] border-[#5385d08a] bg-[#2A2B35] w-full h-[50px]"
                id="searchbar"
              >
                <FiSearch className="text-[27px] text-white ml-3" />
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  placeholder="Try 'Currents' by Tame Impala"
                  className="w-full bg-transparent outline-none placeholder:text-[13px] placeholder:text-white/70 border-0 text-white font-normal ml-3 text-[14px]"
                />
              </div>
              {inputValue.trim() !== "" && (
                <div
                  id="musicsearch"
                  className="bg-[#2A2B35] border-[2px] border-[#5385d08a] w-full min-h-[80px] divide-white/30 h-auto mt-3 divide-y rounded-[10px] "
                >
                  {isLoading ? (
                    <div className="w-full h-[80px] flex justify-center items-center">
                      <RiLoader4Fill className="text-[#7bb0ff] text-3xl animate-spin" />
                    </div>
                  ) : musicList.length > 0 ? (
                    musicList.map((music: any, index) => (
                      <MusicCardSelector
                        key={index}
                        cover={music.album.cover}
                        title={music.title}
                        author={music.artist.name}
                        album={music.album.title}
                        onClick={() =>
                          handleMusicClick(
                            music.artist.name,
                            music.title,
                            music.album.title,
                            music.album.cover
                          )
                        }
                      />
                    ))
                  ) : (
                    <div className="w-full px-3 min-h-[80px] flex justify-center items-center">
                      <h3 className="text-white text-center">
                        We couldn't find any results for your search
                      </h3>
                    </div>
                  )}
                </div>
              )}
            </div>
            {musicHistory && musicHistory.length > 0 && (
              <MusicHistoryCard
                musics={musicHistory}
                selectmusic={handleMusicHistorySelect}
                deletemusic={handleMusicHistoryDelete}
              />
            )}

            <DiscordSyncCard />
          </div>
          {(selectedMusic.author != undefined && musicHistory.length > 0) ||
          Object.keys(selectedMusic).length !== 0 ? (
            <div
              id="lyrics"
              className={`w-[100%] max-w-[1000px] ${
                lyricsError && "bg-[#2a2b35]"
              } min-h-[600px]  mt-10 rounded-t-[30px]`}
            >
              <div className="w-full h-full flex flex-col px-[33px] py-[30px]">
                <div className="flex justify-between items-center">
                  <div className="flex justify-start items-center">
                    <img
                      className="w-[4.5rem] h-[4.5rem] min-w-[4.5rem] bg-white rounded-lg drop-shadow-xl"
                      src={selectedMusic.cover}
                    ></img>
                    <div className="flex flex-col ml-4 justify-center font-medium">
                      <h1 className="text-white ">{selectedMusic.title}</h1>
                      <h4 className="text-sm text-white/60">
                        {selectedMusic.album} - {selectedMusic.author}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  {isLoadingLyrics ? (
                    <div className="w-full flex justify-center items-center mt-5 flex-col">
                      <RiLoader4Fill className="text-white/90 text-4xl animate-spin" />
                      {provider === "Genius Lyrics" && (
                        <p className="text-white/90 mt-3 text-base font-medium">
                          Still working on it!
                        </p>
                      )}
                    </div>
                  ) : lyricsError ? (
                    <div className="bg-white/5 mt-10 py-7 rounded-lg flex justify-center itens-center flex-col">
                      <h3 className="text-white/90 text-center text-2xl font-semibold px-[30px]">
                        We couldn't find any lyrics for this song :(
                      </h3>
                      <h3 className="text-white/80 mt-2 text-center text-lg px-[30px]">
                        We are working on it! 🛠️
                      </h3>
                    </div>
                  ) : (
                    <>
                      <p
                        id="lyricstext"
                        className="text-white whitespace-pre-line text-[1.35rem] leading-[2.2rem] sm:leading-[2.6rem] font-semibold sm:text-[1.4rem]"
                      >{`${musicLyric}`}</p>
                      <p className="mt-12 text-white/80 text-sm">
                        Lyrics provided by {provider}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#2a2b35] w-full mt-10 h-full px-[40px] py-[60px] flex items-center flex-col">
              <h2 className="text-white text-3xl sm:text-3xl  font-semibold text-center">
                You don't have any songs yet
              </h2>
              <h4 className="text-white/70 text-center mt-3 ">
                Add some songs to your history and we'll show you the lyrics
              </h4>
              <h2 className="mt-10 text-center text-white/90 font-medium text-[17px] max-w-[600px]">
                Sing<span className="text-[#4577e4]">Watch</span> is an open
                source project that aims to find song lyrics without
                difficulties, after all who doesn't like to know how to sing
                their favorite song?
              </h2>
              <Link href={"https://github.com/JoaoGabriel-Lima"}>
                <a className="w-full flex justify-center" target={"_blank"}>
                  <button className="mt-10 bg-white/90 w-[90%] max-w-[300px] py-[17px] rounded-lg font-medium drop-shadow-xl">
                    Made with 💖 by Jão
                  </button>
                </a>
              </Link>
            </div>
          )}
        </main>
      </HomeCointainer>
    </ThemeProvider>
  );
};

export default Home;
