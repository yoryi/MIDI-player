import styled from "@emotion/styled";
import Loop from "mdi-react/LoopIcon";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useRef } from "react";
import MusicPlayer from "../../../common/player/Auidio";
import { playOrPause, stop, toggleEnableLoop } from "../../actions";
import { useStores } from "../../hooks/useStores";
import { CircleButton } from "./CircleButton";
import { MiddlePlayButton } from "./MiddlePlayButton";
import { PlayButton } from "./PlayButton";
import { TempoForm } from "./TempoForm";
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 2rem 0.5rem 1rem;
  background: ${({ theme }) => theme.backgroundColor};
  border-top: 1px solid ${({ theme }) => theme.dividerColor};
  height: 4rem;
  box-sizing: border-box;
  @media (max-width: 560px) {
    height: 3.5rem;
    padding-right: 1rem;
    padding-left: 0.5rem;
  }
`;

const StopButton = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("/assets/image/stop.svg");
  background-size: cover;
  @media (max-width: 560px) {
    width: 15px;
    height: 15px;
  }
`;

const LoopButton = styled(CircleButton)`
  &.active {
    color: ${({ theme }) => theme.themeColor};
  }
`;

const MetronomeButton = styled(CircleButton)`
  margin-left: auto;
  margin-right: 1rem;
  @media (max-width: 560px) {
    margin-right: 0;
  }
  &.active {
    color: ${({ theme }) => theme.themeColor};
  }
`;

const MetronomeIconButton = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("/assets/image/metronome.svg");
  background-size: cover;
  @media (max-width: 560px) {
    width: 15px;
    height: 15px;
  }
`;

const TimestampText = styled.div`
  font-family: "titillium-web", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  font-display: swap;
  color: ${({ theme }) => theme.secondaryTextColor};
  @media (max-width: 560px) {
    font-size: 0.9rem;
  }
`;

const Timestamp: FC = observer(() => {
  const { pianoRollStore } = useStores();
  const mbtTime = pianoRollStore.currentMBTTime;
  return <TimestampText>{mbtTime}</TimestampText>;
});

export const ToolbarSeparator = styled.div`
  background: ${({ theme }) => theme.dividerColor};
  margin: 0.4em 1em;
  width: 1px;
  height: 1rem;
  @media (max-width: 560px) {
    display: none;
  }
`;

export const Right = styled.div`
  position: absolute;
  right: 1em;
`;

export const TransportPanel: FC = observer(() => {
  const rootStore = useStores();
  const { player, synth } = rootStore;

  const { isPlaying, isMetronomeEnabled, loop } = player;

  const musicPlayerRef = useRef<MusicPlayer>(null);

  const onClickPlay = playOrPause(rootStore);
  const onClickStop = stop(rootStore);
  const onClickEnableLoop = toggleEnableLoop(rootStore);
  const onClickMetronone = useCallback(() => {
    player.isMetronomeEnabled = !player.isMetronomeEnabled;
  }, [player]);
  const onClickAudioPlay = () => {
    if (musicPlayerRef?.current?.state?.isPlaying)
      musicPlayerRef?.current?.stop();
    else musicPlayerRef?.current?.play();
  };

  const sendPosMessage = (action: string) => {
    window.parent.postMessage(action, "*");
  };

  const handleMessageEvent = (event: MessageEvent) => {
    if (event.origin === "null" && event.data === "stop") {
      console.log("stop post message received", event.data);
      onClickStop();
      musicPlayerRef.current?.reset();
    }
  };
  const handleKeyDownEvent = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      onClickPlay();
      onClickAudioPlay();
    }
  };
  const handleClickEvent = (event: MouseEvent) => {
    if (
      event.button === 0 &&
      (event.target as HTMLElement)?.id === "playGround"
    ) {
      onClickPlay();
      onClickAudioPlay();
    }
  };
  useEffect(() => {
    window.addEventListener("message", handleMessageEvent);
    window.addEventListener("keydown", handleKeyDownEvent);
    window.addEventListener("click", handleClickEvent);
    return () => {
      window.removeEventListener("message", handleMessageEvent);
      window.removeEventListener("keydown", handleKeyDownEvent);
      window.removeEventListener("click", handleClickEvent);
    };
  }, []);
  useEffect(() => {
    musicPlayerRef &&
      musicPlayerRef?.current?.updatePlaybackRate(player.currentTempo);
  }, [player.currentTempo]);
  return (
    <Toolbar>
      <MusicPlayer ref={musicPlayerRef} />
      <CircleButton
        onClick={() => {
          onClickStop();
          musicPlayerRef.current?.reset();
        }}
        id="button-stop"
      >
        <StopButton id="button-stop" />
      </CircleButton>
      <MiddlePlayButton
        onClick={() => {
          sendPosMessage("play");
          onClickPlay();
          onClickAudioPlay();
        }}
        isPlaying={isPlaying}
      />
      <PlayButton
        onClick={() => {
          sendPosMessage("play");
          onClickPlay();
          onClickAudioPlay();
        }}
        isPlaying={isPlaying}
      />
      {loop && (
        <LoopButton
          onClick={onClickEnableLoop}
          className={loop.enabled ? "active" : undefined}
        >
          <Loop />
        </LoopButton>
      )}

      <ToolbarSeparator />

      <MetronomeButton
        onClick={onClickMetronone}
        className={isMetronomeEnabled ? "active" : undefined}
      >
        <MetronomeIconButton />
      </MetronomeButton>

      <TempoForm />

      <ToolbarSeparator />

      <Timestamp />
    </Toolbar>
  );
});
