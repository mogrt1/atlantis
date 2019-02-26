import { action } from "../Context/Context";
import { XAudioJSWebAudioContextHandle as audioContext } from "../../cores/GameBoy-Online/index";

export const enableAudio = action(`ENABLE_AUDIO`, (state, dispatch) => {
  if (!state.mute && audioContext && audioContext.state === `suspended`) {
    audioContext.resume();

    const CHECK_AUDIO_WAIT = 1000;

    setTimeout(() => {
      if (audioContext.state === `suspended`) {
        dispatch({ audioNeedsConfirmation: true });
      } else {
        dispatch({ audioNeedsConfirmation: false });
      }
    }, CHECK_AUDIO_WAIT);
  } else {
    dispatch({ audioNeedsConfirmation: false });
  }
});
