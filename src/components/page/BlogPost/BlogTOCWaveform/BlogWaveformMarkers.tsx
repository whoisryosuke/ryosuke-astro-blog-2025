import React, { useEffect, useRef, useState } from "react";
import type { WaveformHeadingData } from "./types";
import BlogWaveformMarker from "./BlogWaveformMarker";
import styles from "./BlogTOCWaveform.module.css";
import tooltipStyles from "../../../../styles/components/tooltip.module.css";
import { Tooltip } from "@base-ui/react";
import TooltipArrowIcon from "../../../icons/TooltipArrowIcon";

const markerTooltip = Tooltip.createHandle<string>();

type Props = {
  width: number;
  headings: WaveformHeadingData[];
  pageSize: number;
  selectedHeading: WaveformHeadingData | null;
  setSelectedHeading: React.Dispatch<
    React.SetStateAction<WaveformHeadingData | null>
  >;
};

const BlogWaveformMarkers = ({
  width,
  headings,
  pageSize,
  selectedHeading,
  setSelectedHeading,
}: Props) => {
  const renderHeadings = headings.map((heading) => (
    <BlogWaveformMarker
      key={heading.id}
      width={width}
      heading={heading}
      pageSize={pageSize}
      handle={markerTooltip}
      setSelectedHeading={setSelectedHeading}
    />
  ));

  return (
    <div className={styles.MarkerContainer} data-small={true}>
      <Tooltip.Provider>
        {renderHeadings}
        <Tooltip.Root
          handle={markerTooltip}
          // Debug
          // open={true}
          // triggerId={"what-are-design-tokens"}
        >
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={10} style={{ zIndex: 999 }}>
              <Tooltip.Popup className={tooltipStyles.Popup}>
                <Tooltip.Arrow className={tooltipStyles.Arrow}>
                  <TooltipArrowIcon />
                </Tooltip.Arrow>
                {selectedHeading?.title}
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

export default BlogWaveformMarkers;
