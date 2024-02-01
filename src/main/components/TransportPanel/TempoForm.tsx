import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { DEFAULT_TEMPO } from "../../../common/player";
import { useStores } from "../../hooks/useStores";

const TempoInput = styled.input`
  background: transparent;
  -webkit-appearance: none;
  border: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  width: 2em;
  text-align: left;
  outline: none;
  font-family: "titillium-web", sans-serif;
  font-size: 1.2rem;
  padding: 0.3rem 0.5rem;
  @media (max-width: 560px) {
    font-size: 0.9rem;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const TempoWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  padding-left: 0.75rem;
  border-radius: 0.25rem;

  label {
    font-size: 1.2rem;
    font-family: "titillium-web", sans-serif;
    font-weight: 600;
    color: ${({ theme }) => theme.secondaryTextColor};
    @media (max-width: 560px) {
      font-size: 0.9rem;
    }
  }

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.dividerColor};
    background: #ffffff14;
  }
`;

export const TempoForm: FC = observer(() => {
  const {
    song,
    pianoRollStore: { currentTempo },
    player,
  } = useStores();
  const tempo = currentTempo ?? DEFAULT_TEMPO;

  const changeTempo = (tempo: number) => {
    const fixedTempo = Math.max(1, Math.min(512, tempo));
    song.conductorTrack?.setTempo(fixedTempo, player.position);
    player.currentTempo = fixedTempo;
  };

  const onKeyPressTempo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const onChangeTempo = (e: React.ChangeEvent<HTMLInputElement>) =>
    changeTempo(parseFloat(e.target.value));

  return (
    <TempoWrapper id="tempoWrapper">
      <label htmlFor="tempo-input" id="tempo-label">
        BPM:
      </label>
      <TempoInput
        type="number"
        id="tempo-input"
        min={1}
        max={1000}
        value={Math.round(tempo * 100) / 100}
        step={1}
        onChange={onChangeTempo}
        onKeyPress={onKeyPressTempo}
      />
    </TempoWrapper>
  );
});
