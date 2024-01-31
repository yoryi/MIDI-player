import React, { ChangeEvent, Component, RefObject } from "react";

declare global {
  interface Window {
    audioFile: string;
  }
}

interface MusicPlayerProps {
  onPlay?: () => void;
  onStop?: () => void;
  bpm?: number;
}

interface MusicPlayerState {
  isPlaying: boolean;
  bpm: number;
}

class MusicPlayer extends Component<MusicPlayerProps, MusicPlayerState> {
  private audioRef: RefObject<HTMLAudioElement>;

  constructor(props: MusicPlayerProps) {
    super(props);

    this.state = {
      isPlaying: false,
      bpm: props.bpm || 120,
    };

    this.audioRef = React.createRef();
  }

  play = (): void => {
    if (this.audioRef.current) {
      this.audioRef.current.play();
      this.setState({ isPlaying: true }, () => {
        if (this.props.onPlay) {
          this.props.onPlay();
        }
      });
    }
  };

  stop = (): void => {
    if (this.audioRef.current) {
      this.audioRef.current.pause();
      this.setState({ isPlaying: false }, () => {
        if (this.props.onStop) {
          this.props.onStop();
        }
      });
    }
  };

  reset = (): void => {
    if (this.audioRef.current) {
      this.audioRef.current.pause();
      this.audioRef.current.currentTime = 0;
      this.setState({ isPlaying: false }, () => {
        if (this.props.onStop) {
          this.props.onStop();
        }
      });
    }
  };

  setBPM = (newBPM: number): void => {
    this.setState({ bpm: newBPM });
  };

  handleBPMChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newBPM = parseInt(event.target.value, 10);
    this.setBPM(newBPM);
  };

  render(): JSX.Element {
    const { isPlaying, bpm } = this.state;

    return (
      <div style={{ display: "none" }}>
        <audio
          ref={this.audioRef}
          onEnded={() => this.setState({ isPlaying: false })}
          controls
        >
          <source src={`/${window.audioFile}?v=1`} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

export default MusicPlayer;
