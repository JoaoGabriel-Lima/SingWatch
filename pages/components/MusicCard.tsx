/* eslint-disable require-jsdoc */
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { ThemeProvider } from "styled-components";

import styled from "styled-components";

const MusicCard = styled.div`
  border-color: ${(props: any) => props.theme.borderColor};
`;

function MusicFile(props: any) {
  const theme = {
    // borderColor:
    //   props.selectedColor && props.selected
    //     ? props.selectedColor
    //     : props.selectedColor,
  };

  return (
    <ThemeProvider theme={theme}>
      <MusicCard
        className={`bg-[#40649b] flex items-center justify-center rounded-lg border-[3px] ${
          props.selected
            ? "border-[#aed2e2] drop-shadow-[0_1px_3px_#ffffff68] "
            : `border-[#7BB0FF] drop-shadow-md`
        }   h-20 w-20 min-w-[5rem]`}
      >
        <img
          src={props.cover}
          className="w-full h-full rounded-md cursor-pointer"
          onClick={() => props.selectmusic(props.index)}
        />
        <div
          onClick={() => props.deletemusic(props.index)}
          className="w-6 h-6 cursor-pointer rounded-full bg-[#DDDDDD] absolute top-[-8px] right-[-11px] flex justify-center items-center"
        >
          <RiCloseFill className="text-black" />
        </div>
      </MusicCard>
    </ThemeProvider>
  );
}

export default MusicFile;
