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
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 47%;
  left: 50%;
  width: 130px;
  height: 130px;
  transform: translate(-50%, -50%);
  background: ${window.colors.white};
  &:hover {
    background: ${window.colors.primary};
    opacity: 0.8;
  }
  &.active {
    background: ${window.colors.primary};
  }
  @media (max-width: 560px) {
    width: 80px;
    height: 80px;
  }
`;

export const StyledPlay = styled(PlayArrow)`
  margin-left: 10px;
  width: 50px;
  height: 52px;
  background-image: url('/assets/image/play icon.svg');
  background-size: cover;
  @media (max-width: 560px) {
    width: 30px;
    height: 30px;
  }
  path {
    display: none;
  }
`;

export interface PlayButtonProps {
  onClick?: () => void;
  isPlaying: boolean;
}

export const MiddlePlayButton: FC<PlayButtonProps> = (
  { onClick, isPlaying },
  ref
) => {
  if (!isPlaying)
    return (
      <StyledButton
        id="button-play"
        onClick={onClick}
        className={isPlaying ? "active" : undefined}
      >
        {isPlaying ? <Pause /> : <StyledPlay />}
      </StyledButton>
    );
  return <></>;
};
