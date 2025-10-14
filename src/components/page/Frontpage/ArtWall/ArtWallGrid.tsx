import React, { useEffect, useMemo, useRef, useState } from "react";
import ArtWallTile from "./ArtWallTile";
import type { SelectedTile } from "./types";

const getTileWidth = (windowWidth: number) => {
  let tileWidth = 150;

  if (windowWidth > 1000) {
    tileWidth = 150;
  }
  if (windowWidth > 1600) {
    tileWidth = 175;
  }

  return tileWidth;
};

type Props = {};

const ArtWallGrid = (props: Props) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [selectedTiles, setSelectedTiles] = useState<SelectedTile[]>([
    {
      row: 0,
      id: 0,
    },
  ]);
  const interval = useRef<ReturnType<typeof setInterval>>(null);
  // We always render 3 rows
  const rows = useMemo(() => new Array(3).fill(0), []);
  // We change the number of tiles per grid row based on window size
  const gridRow = useMemo(
    () =>
      new Array(
        Math.round(windowSize.width / getTileWidth(windowSize.width))
      ).fill(0),
    [windowSize]
  );

  // Resize logic
  // @TODO: Throttle
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Animation logic
  const idleAnimation = () => {
    // console.log("animating tiles...");
    setSelectedTiles((prevTiles) => {
      const newTiles = prevTiles.map((tile) => {
        const newTileId = tile.id + 1;
        if (newTileId > gridRow.length) {
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
  }, [windowSize]);

  // console.log("selected", selectedTiles);
  // console.log("window size", windowSize);

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
