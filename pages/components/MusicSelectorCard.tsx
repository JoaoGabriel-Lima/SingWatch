/* eslint-disable require-jsdoc */
import React from "react";

function MusicCardSelector(props: any) {
  return (
    <div
      onClick={props.onClick}
      className="flex justify-between w-full hover:bg-white/10 cursor-pointer px-4 py-3 "
    >
      <div className="flex items-center justify-start">
        <img
          src={props.cover}
          className="h-12 w-12 min-w-[3rem] bg-[#4c5288] rounded-lg"
        ></img>
        <div className="ml-4 flex flex-col items-start justify-center">
          <h2 className="text-white">{props.title}</h2>
          <h4 className="text-sm text-white/70 mt-0">
            {props.album} - {props.author}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default MusicCardSelector;
