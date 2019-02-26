import React from "react";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";

import SettingsControlToggle from "./SettingsControlToggle";

const SettingsShowOverlay = () => (
  <SettingsControlToggle
    icon={<VideogameAssetIcon />}
    label="Touch Overlay"
    setting="showOverlay"
  />
);

export default React.memo(SettingsShowOverlay, () => true);
