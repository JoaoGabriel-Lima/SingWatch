/* eslint-disable require-jsdoc */
import axios from "axios";
import React, { useEffect } from "react";

function DiscordSyncCard(props: any) {
  const [discordSync, setDiscordSync]: any = React.useState(null);
  const [nowPlaying, setNowPlaying]: any = React.useState(null);
  const [lastPlayed, setLastPlayed]: any = React.useState(null);
  const [musicData, setMusicData]: any = React.useState(null);
  // const [lastUpdate, setLastUpdate]: any = React.useState(null);
  //   useEffect(() => {
  //     props.musics.reverse();
  //   }, [props.musics]);

  // Create a function that will recive a date and will return a string with the time since the date in minutes
  function timeSince(date: any) {
    const actualdate: any = new Date();

    // console.log(date);
    const seconds = Math.floor((actualdate - Date.parse(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval;
    } else {
      return interval;
    }
  }

  // useEffect(() => {
  //   if (discordSync != null) {
  //     setLastUpdate(discordSync.musicPlaying.updateAt);
  //   }
  // }, [discordSync]);

  useEffect(() => {
    updateCheckStatus(discordSync);
  }, []);

  useEffect(() => {
    if (lastPlayed == null && nowPlaying != null) {
      console.log("First Init");
      axios
        .post("/api/getMusicInfo", {
          music: `${nowPlaying.music} ${nowPlaying.author}`,
        })
        .then((res) => {
          if (Object.keys(res.data).length == 0) {
            setMusicData(null);
            setLastPlayed(nowPlaying);
          } else {
            // console.log(res.data);
            setMusicData(res.data);
            setLastPlayed(nowPlaying);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (nowPlaying != undefined) {
      if (lastPlayed == null) {
        return;
      }
      if (lastPlayed != null && lastPlayed.music !== nowPlaying.music) {
        console.log("Pegando dados da música");

        axios
          .post("/api/getMusicInfo", {
            music: `${nowPlaying.music} ${nowPlaying.author}`,
          })
          .then((res) => {
            if (res.data == {}) {
              setMusicData(null);
              setLastPlayed(nowPlaying);
            } else {
              // console.log(res.data);
              setMusicData(res.data);
              setLastPlayed(nowPlaying);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (lastPlayed.music == nowPlaying.music) {
        axios
          .post("/api/getMusicInfo", {
            music: `${nowPlaying.music} ${nowPlaying.author}`,
          })
          .then((res) => {
            if (res.data == {}) {
              setMusicData(null);
              setLastPlayed(nowPlaying);
            } else {
              // console.log(res.data);
              setMusicData(res.data);
              setLastPlayed(nowPlaying);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      setMusicData(null);
    }
  }, [nowPlaying, lastPlayed]);

  function updateCheckStatus(ctx: any) {
    // console.log("updateCheckStatus");
    axios
      .post("https://sing-watch.vercel.app/api/checker", {
        userID: "528228889823281152",
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          // console.log(data);
          if (data != null) {
            if (ctx === null) {
              console.log("DiscordSync is null");
              setNowPlaying(data.musicPlaying.musicData);
              // setLastUpdate(timeSince(data.musicPlaying.updateAt));
              setDiscordSync(data);
            } else {
              if (ctx.serverid != data.serverid) {
                console.log("ServerID diferente");
                // console.log(data.musicPlaying.musicData);
                // console.log(lastPlayed);
                setNowPlaying(data.musicPlaying.musicData);

                // setLastUpdate(timeSince(data.musicPlaying.updateAt));
                setDiscordSync(data);
              } else if (data.musicPlaying.musicData != undefined) {
                if (data != null && nowPlaying != null) {
                  if (nowPlaying.music != data.musicPlaying.musicData.music) {
                    // setLastUpdate(timeSince(data.musicPlaying.updateAt));
                    setNowPlaying(data.musicPlaying.musicData);
                    setDiscordSync(data);
                  }
                }
              } else {
                setNowPlaying(data.musicPlaying.musicData);
                setDiscordSync(data);
              }
            }
          } else {
            setDiscordSync(null);
          }
        }
      });
  }
  // useEffect(() => {
  //   updateCheckStatus();
  //   const interval = setTimeout(() => updateCheckStatus(), 5000);
  //   return () => {
  //     clearTimeout(interval);
  //   };
  // }, [discordSync]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCheckStatus(discordSync);
    }, 5000);

    return () => clearInterval(interval);
  }, [discordSync]);

  return (
    <>
      {discordSync && (
        <div
          id="discordcard"
          className="bg-[#2A2B35] border-[2px] border-[#5385d08a] w-full min-h-[135px] h-[135px] mt-5 flex flex-col  pb-2 rounded-[10px] px-4"
        >
          <h4 className="text-white text-[13px] pt-3">Discord Sync</h4>

          <div className="h-full flex justify-start items-center pt-3 gap-x-3 pb-2 overflow-x-auto">
            {musicData && timeSince(discordSync.musicPlaying.updateAt) < 6 ? (
              <>
                <img
                  className="w-16 h-16 bg-black rounded-md mr-2"
                  src={musicData.data.album.cover}
                ></img>
                <div className="flex flex-col justify-start">
                  <h3 className="text-white mb-0">{musicData.data.title}</h3>
                  <h2 className="text-white/60 font-light">
                    {musicData.data.artist.name}
                  </h2>
                  <h4 className="text-white/70 font-light text-sm">
                    tocada a {timeSince(discordSync.musicPlaying.updateAt)}{" "}
                    minutos atrás
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
