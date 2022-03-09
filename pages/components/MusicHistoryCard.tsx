/* eslint-disable require-jsdoc */
import React from "react";
import MusicFile from "./MusicCard";

function MusicHistoryCard(props: any) {
  //   useEffect(() => {
  //     props.musics.reverse();
  //   }, [props.musics]);
  return (
    <div
      id="musichistory"
      className="bg-[#2A2B35] border-[2px] border-[#5385d08a] w-full min-h-[135px] mt-5  pb-2 rounded-[10px] px-4"
    >
      <h4 className="text-white text-[13px] pt-3">Music History</h4>

      <div className="flex justify-start items-center pt-3 gap-x-3 pb-2 overflow-x-auto">
        {props.musics.map((music: any, index: Number) => (
          <MusicFile
            selected={index === 0 ? true : false}
            selectmusic={props.selectmusic}
            deletemusic={props.deletemusic}
            index={index}
            key={index}
            cover={music.cover}
          />
        ))}
      </div>
    </div>
  );
}

export default MusicHistoryCard;
