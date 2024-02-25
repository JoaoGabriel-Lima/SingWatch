/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import axios from "axios";
import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import { MusicContext } from "../../context/music";

function DiscordSyncCard(props: any) {
  const socketurl = "http://localhost:4040";
  const [discordSync, setDiscordSync]: any = React.useState(null);
  const [nowPlaying, setNowPlaying]: any = React.useState(null);
  const [musicData, setMusicData]: any = React.useState(null);
  const [firsttime, setFirstTime]: any = React.useState(true);
  const {
    selectedMusic,
    setSelectedMusic,
    isSyncEnabled,
    setSyncEnabled,
    setSeconds,
    setSyncNowPlaying,
  } = useContext(MusicContext);
  const [inputID, setInputID]: any = React.useState("");
  const [datatofetch, setData]: any = React.useState(null);
  const [minutes, setMinutes]: any = React.useState(0);

  const getUser = (data: any, id: string) => {
    if (data != null) {
      return data.find((data: any) => data.channels[0].users.includes(id));
    } else {
      return {};
    }
  };

  function timeSince(date: any) {
    const actualdate: any = new Date();
    const seconds = Math.floor((actualdate - Date.parse(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval;
    } else {
      return interval;
    }
  }

  function timeSinceSeconds(date: any) {
    const actualdate: any = new Date();
    const seconds = actualdate - Date.parse(date);
    // const ms = seconds * 1000;
    return Math.floor(seconds);
    // return ms;
  }

  function setSync() {
    if (isSyncEnabled) {
      setSyncEnabled(!isSyncEnabled);
      const syncdata = [inputID, !isSyncEnabled];
      localStorage.setItem("discordID", JSON.stringify(syncdata));
    } else {
      if (inputID.trim() != "") {
        setSyncEnabled(!isSyncEnabled);
        const syncdata = [inputID, !isSyncEnabled];
        localStorage.setItem("discordID", JSON.stringify(syncdata));
        const content = getUser(datatofetch, inputID);
        setDiscordSync(content);
      } else {
        const syncdata = [inputID, isSyncEnabled];
        localStorage.setItem("discordID", JSON.stringify(syncdata));
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (discordSync) {
        const seconds = timeSinceSeconds(discordSync?.musicPlaying?.updateAt);
        setSeconds(seconds);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [discordSync]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (discordSync) {
        const minutes = timeSince(discordSync?.musicPlaying?.updateAt);
        setMinutes(minutes);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [discordSync]);

  useEffect(() => {
    if (typeof window === "object") {
      if (localStorage.getItem("discordID") !== null) {
        const data = JSON.parse(localStorage.getItem("discordID") || "[]");
        setInputID(data[0]);
        setSyncEnabled(data[1]);
      }
    }
    const socket = io(`${socketurl}`, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("previusData", (data: any) => {
      const inputvalue = JSON.parse(
        localStorage.getItem("discordID") || "[]"
      )[0];
      const content = getUser(data, inputID || inputvalue);
      setDiscordSync(content);
      setData(data);
    });
    socket.on("setNewData", (data: any) => {
      const inputvalue = JSON.parse(
        localStorage.getItem("discordID") || "[]"
      )[0];
      const content = getUser(data, inputID || inputvalue);
      setDiscordSync(content);
      setData(data);
    });
  }, []);
  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
  useEffect(() => {
    if (isSyncEnabled) {
      if (discordSync != null || discordSync != undefined) {
        if (nowPlaying != null) {
          if (nowPlaying.music != discordSync.musicPlaying.musicData.music) {
            const music = discordSync.musicPlaying.musicData;
            setNowPlaying(music);
            axios
              .post("/api/getMusicInfo", {
                music: `${music.music} ${music.author}`,
              })
              .then(async (res: any) => {
                if (Object.keys(res.data).length == 0) {
                  setMusicData(null);
                } else {
                  const data = {
                    album: res.data.data.album.title,
                    author: res.data.data.artist.name,
                    cover: res.data.data.album.cover,
                    title: res.data.data.title,
                  };
                  if (timeSince(discordSync.musicPlaying.updateAt) < 6) {
                    if (firsttime) {
                      setFirstTime(false);
                      await delay(3000);
                      setSyncNowPlaying(data);
                      setSelectedMusic(data);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth", // for smoothly scrolling
                      });
                    } else {
                      setSyncNowPlaying(data);
                      setSelectedMusic(data);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth", // for smoothly scrolling
                      });
                    }
                  } else if (timeSince(discordSync.musicPlaying.updateAt) > 6) {
                    const musicData = JSON.parse(
                      localStorage.getItem("musicHistory") || "[]"
                    );
                    if (musicData.length > 0) {
                      setSelectedMusic(musicData[0]);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth", // for smoothly scrolling
                      });
                    } else {
                      setSelectedMusic({});
                    }
                  }
                  setMusicData(res.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (Object.keys(selectedMusic).length != 0 && isSyncEnabled) {
            if (
              discordSync.musicPlaying.musicData.music
                .toLowerCase()
                .includes(selectedMusic.title.toLowerCase())
            ) {
            } else {
              setNowPlaying({});
            }
          }
        } else if (
          discordSync?.musicPlaying?.musicData != null ||
          discordSync?.musicPlaying?.musicData != undefined
        ) {
          const music = discordSync.musicPlaying.musicData;
          setNowPlaying(music);
          axios
            .post("/api/getMusicInfo", {
              music: `${music.music} ${music.author}`,
            })
            .then(async (res: any) => {
              if (Object.keys(res.data).length == 0) {
                setMusicData(null);
              } else {
                const data = {
                  album: res.data.data.album.title,
                  author: res.data.data.artist.name,
                  cover: res.data.data.album.cover,
                  title: res.data.data.title,
                };
                if (timeSince(discordSync.musicPlaying.updateAt) < 6) {
                  if (firsttime) {
                    setFirstTime(false);
                    await delay(3000);
                    setSyncNowPlaying(data);
                    setSelectedMusic(data);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // for smoothly scrolling
                    });
                  } else {
                    setSyncNowPlaying(data);
                    setSelectedMusic(data);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // for smoothly scrolling
                    });
                  }
                } else if (timeSince(discordSync.musicPlaying.updateAt) > 6) {
                  const musicData = JSON.parse(
                    localStorage.getItem("mtusicHistory") || "[]"
                  );
                  if (musicData.length > 0) {
                    setSelectedMusic(musicData[0]);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // for smoothly scrolling
                    });
                  } else {
                    setSelectedMusic({});
                  }
                }
                setMusicData(res.data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        const musicData = JSON.parse(
          localStorage.getItem("musicHistory") || "[]"
        );
        if (musicData.length > 0) {
          if (!discordSync) {
            setSelectedMusic(musicData[0]);
          } else {
            setSelectedMusic({});
          }
        } else {
          setSelectedMusic({});
        }
      }
    }
  }, [discordSync, isSyncEnabled]);

  return (
    <>
      <div
        id="discordcard"
        className="bg-[#2A2B35] border-[2px] border-[#5385d08a] w-full  h-12 mt-5 flex flex-row rounded-[10px] px-0"
      >
        <input
          value={inputID}
          onChange={(e) => setInputID(e.target.value)}
          type="number"
          disabled={isSyncEnabled}
          placeholder="Use your DiscordID to sync your music"
          className="disabled:text-opacity-50 appearance-none w-full bg-transparent outline-none placeholder:text-[13px] placeholder:text-white/70 border-0 text-white font-normal ml-3 text-[14px]"
        />
        <button
          onClick={() => setSync()}
          className={`${
            isSyncEnabled
              ? "bg-[#205db9] text-white/90"
              : "bg-[#2a79ef] text-white/90"
          } min-w-max px-7 text-sm rounded-r-[8px] `}
        >
          {isSyncEnabled ? "Disable Sync" : "Enable Sync"}
        </button>
      </div>
      {discordSync && isSyncEnabled && (
        <div
          id="discordcard"
          className="bg-[#2A2B35] border-[2px] border-[#5385d08a] w-full  h-auto mt-3 flex flex-col  pb-2 rounded-[10px] px-4"
        >
          <h4 className="text-white text-[13px] pt-3">
            Discord Sync - {discordSync.servername}
          </h4>

          <div className="h-full flex justify-start items-center pt-4 gap-x-3 pb-[0.57rem] overflow-x-auto">
            {musicData && timeSince(discordSync.musicPlaying.updateAt) < 6 ? (
              <>
                <img
                  className="w-16 h-16 bg-black rounded-md mr-2"
                  src={musicData.data.album.cover}
                ></img>
                <div className="flex flex-col justify-start">
                  <h3 className="text-white mb-0">{musicData.data.title}</h3>
                  <h2 className="text-white/80 font-light text-sm">
                    {musicData.data.artist.name}
                  </h2>
                  <h4 className="text-white/60 font-light text-xs mt-1">
                    {minutes <= 1
                      ? "Iniciada agora"
                      : "Iniciada a " + minutes + " minutos"}
                  </h4>
                </div>
              </>
            ) : (
              <>
                <img
                  className="w-16 h-16 bg-black rounded-xl mr-2"
                  src={discordSync.servericon}
                ></img>
                <div className="flex flex-col justify-start">
                  <h3 className="text-white mb-0">{discordSync.servername}</h3>
                  <h2 className="text-white/60 font-light">
                    Waiting for the music start
                  </h2>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DiscordSyncCard;
