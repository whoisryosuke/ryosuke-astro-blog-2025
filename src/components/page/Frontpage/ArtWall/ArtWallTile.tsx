import React from "react";
import PalletteIcon from "../../../icons/PalletteIcon";

type Props = {
  selected: boolean;
};

const ArtWallTile = ({ selected }: Props) => {
  const bgImage = `url(images/art-wall/ps1-mem-card-red.jpg)`;
  return (
    <div className={`ArtWallTile ${selected && "selected"}`} tabIndex={0}>
      <div className="placeholder">
        <PalletteIcon width="36px" />
      </div>
      <div className="art" style={{ backgroundImage: bgImage }} />
    </div>
  );
};

export default ArtWallTile;
