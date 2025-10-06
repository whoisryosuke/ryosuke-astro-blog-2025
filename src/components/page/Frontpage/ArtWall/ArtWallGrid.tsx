import React, { useEffect, useMemo, useRef, useState } from "react";
import ArtWallTile from "./ArtWallTile";
import type { SelectedTile } from "./types";

type Props = {};

const ArtWallGrid = (props: Props) => {
  const [selectedTiles, setSelectedTiles] = useState<SelectedTile[]>([
    {
      row: 0,
      id: 0,
    },
  ]);
  const interval = useRef<ReturnType<typeof setInterval>>(null);
  const rows = useMemo(() => new Array(3).fill(0), []);
  const gridRow = useMemo(() => new Array(10).fill(0), []);

  const idleAnimation = () => {
    console.log("animating tiles...");
    setSelectedTiles((prevTiles) => {
      const newTiles = prevTiles.map((tile) => {
        const newTileId = tile.id + 1;
        if (newTileId > 10) {
          let newRowId = tile.row + 1;
          if (newRowId > 2) newRowId = 0;
          return {
            row: newRowId,
            id: 0,
          };
        }

        return {
          ...tile,
          id: newTileId,
        };
      });

      return newTiles;
    });
  };

  useEffect(() => {
    interval.current = setInterval(idleAnimation, 400);

    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, []);

  console.log("selected", selectedTiles);

  const renderRows = rows.map((_, rowIndex) => (
    <div className="row">
      {gridRow.map((_, cellIndex) => {
        const selected = selectedTiles.reduce((merge, tile) => {
          // Same row
          const isSameRow = tile.row == rowIndex;
          const isThreeInRow =
            tile.id > cellIndex - 2 && tile.id < cellIndex + 2;
          if (isSameRow && isThreeInRow) merge = true;

          // Above or below
          if (
            tile.row > rowIndex - 2 &&
            tile.row < rowIndex + 2 &&
            tile.id == cellIndex
          )
            merge = true;

          return merge;
        }, false);
        // const foundRow = selectedTiles.findIndex(
        //   (tile) =>
        //     tile.row > rowIndex - 2 &&
        //     tile.row < rowIndex + 2 &&
        //     tile.id == cellIndex
        // );
        // const selected = foundRow >= 0;
        return (
          <ArtWallTile key={`${rowIndex}-${cellIndex}`} selected={selected} />
        );
      })}
    </div>
  ));

  return <div className="ArtWallGrid">{renderRows}</div>;
};

export default ArtWallGrid;
