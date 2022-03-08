/* eslint-disable require-jsdoc */
import React from "react";
import { RiCloseFill } from "react-icons/ri";

function MusicFile(props: any) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-[#40649b] border-[3px] ${
        props.selected
          ? "border-[#2A79EF] drop-shadow-[0_2px_5px_#0f5afd66]"
          : "border-[#7BB0FF] drop-shadow-md"
      }   h-20 w-20 min-w-[5rem]`}
    >
      <div className="w-6 h-6 cursor-pointer rounded-full bg-[#DDDDDD] absolute top-[-8px] right-[-11px] flex justify-center items-center">
        <RiCloseFill className="text-black" />
      </div>
    </div>
  );
}

export default MusicFile;
