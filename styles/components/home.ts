import styled from "styled-components";

export const HomeCointainer = styled.div`
  main {
    width: 100vw;
    /* height: 100vh; */
    max-width: 100%;
    background-color: #1c1d26;
  }

  #searchbar {
    box-shadow: 0px 4px 0px #314056;
  }

  #musichistory {
    box-shadow: 0px 4px 0px #314056;
  }
  #discordcard {
    box-shadow: 0px 4px 0px #314056;
  }

  #lyrics {
    background-color: ${(props) =>
      props.theme.error ? "#2a2b35" : props.theme.colors};
  }

  .lyricstext {
    color: ${(props) =>
      props.theme.textColor ? "rgba(0, 0, 0, 0.6)" : "rgba(255,255,255,0.8)"};
  }
`;
