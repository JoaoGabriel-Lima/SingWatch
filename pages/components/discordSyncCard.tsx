/* eslint-disable require-jsdoc */
import axios from "axios";
import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import { MusicContext } from "../../context/music";

function DiscordSyncCard(props: any) {
  const [discordSync, setDiscordSync]: any = React.useState(null);
  const [nowPlaying, setNowPlaying]: any = React.useState(null);
  const [musicData, setMusicData]: any = React.useState(null);
  const { setSelectedMusic, isSyncEnabled, setSyncEnabled } =
    useContext(MusicContext);
  const [inputID, setInputID]: any = React.useState("");
  const [datatofetch, setData]: any = React.useState(null);

  useEffect(() => {
    if (typeof window === "object") {
      if (localStorage.getItem("discordID") !== null) {
        const data = JSON.parse(localStorage.getItem("discordID") || "[]");
        setInputID(data[0]);
        setSyncEnabled(data[1]);
        // console.log(data[1]);
      }
    }

    const socket = io("https://singwatch-backend.herokuapp.com/", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("previusData", (data: any) => {
      // console.log(data);
      const inputvalue = JSON.parse(
        localStorage.getItem("discordID") || "[]"
      )[0];
      const content = getUser(data, inputID || inputvalue);
      setDiscordSync(content);
      setData(data);
    });
    socket.on("setNewData", (data: any) => {
      // console.log(data);
      const inputvalue = JSON.parse(
        localStorage.getItem("discordID") || "[]"
      )[0];
      const content = getUser(data, inputID || inputvalue);
      setDiscordSync(content);
      setData(data);
    });
  }, []);

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
              .then((res): any => {
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
                    setSelectedMusic(data);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // for smoothly scrolling
                    });
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
          }
        } else if (
          discordSync.musicPlaying.musicData != null ||
          discordSync.musicPlaying.musicData != undefined
        ) {
          const music = discordSync.musicPlaying.musicData;
          setNowPlaying(music);
          axios
            .post("/api/getMusicInfo", {
              music: `${music.music} ${music.author}`,
            })
            .then((res): any => {
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
                  setSelectedMusic(data);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // for smoothly scrolling
                  });
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
                  // } else {
                  // }
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
          setSelectedMusic(musicData[0]);
        } else {
          setSelectedMusic({});
        }
      }
    }
  }, [discordSync, isSyncEnabled]);

  // create a function that will get a array of objects and will return the one where has the id "123" inside object.channels[0].users array
  const getUser = (data: any, id: string) => {
    return data.find((data: any) => data.channels[0].users.includes(id));
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
                    {timeSince(discordSync.musicPlaying.updateAt) <= 1
                      ? "Iniciada agora"
                      : "Iniciada há " +
                        timeSince(discordSync.musicPlaying.updateAt) +
                        " minutos"}
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
