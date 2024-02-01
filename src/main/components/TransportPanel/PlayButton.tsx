import styled from "@emotion/styled";
import Pause from "mdi-react/PauseIcon";
import PlayArrow from "mdi-react/PlayArrowIcon";
import { FC } from "react";
import { CircleButton } from "./CircleButton";

declare global {
  interface Window {
    colors: any;
  }
}
export const StyledButton = styled(CircleButton)`
  margin-left: 0.8rem;
  background: ${window.colors.white};

  padding: 0.7rem 0.7rem;
  &:hover {
    background: ${window.colors.primary};
    opacity: 0.8;
  }

  &.active {
    background: ${window.colors.primary};
  }
`;

export const StyledPlayButton = styled(PlayArrow)`
  margin-left: 0.2rem;
  width: 17px;
  height: 18px;
  background-image: url("/assets/image/play icon.svg");
  background-size: cover;
  @media (max-width: 560px) {
    width: 15px;
    height: 16px;
  }
  path {
    display: none;
  }
`;

export interface PlayButtonProps {
  onClick?: () => void;
  isPlaying: boolean;
}

export const PlayButton: FC<PlayButtonProps> = (
  { onClick, isPlaying },
  ref
) => {
  return (
    <StyledButton
      id="button-play"
      onClick={onClick}
      className={isPlaying ? "active" : undefined}
    >
      {isPlaying ? (
        <Pause id="button-play" />
      ) : (
        <StyledPlayButton id="button-play" />
      )}
    </StyledButton>
  );
};
