import React from "react";
import type { StyleProps } from "./types";

type Props = {
  styleProps: StyleProps;
  debugView: boolean;
  width?: number;
  responsive: boolean;
  breakpointKey: [string, number];
};

const Preview = ({
  styleProps,
  debugView,
  responsive,
  width,
  breakpointKey,
}: Props) => {
  const responsiveStyles = responsive
    ? {
        width: width,
        background: "var(--color-secondary-900)",
        padding: "2rem",
        borderRadius: "var(--space-0-75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }
    : {};
  return (
    <div
      style={{
        flex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={responsiveStyles}>
        {responsive && (
          <div
            style={{
              position: "absolute",
              padding: "var(--space-0-5) var(--space-0-75)",
              borderRadius: "var(--space-0-25)",
              top: "var(--space-0-5)",
              left: "var(--space-0-5)",
              fontSize: "var(--font-size-2)",
              fontFamily: "var(--font-family-mono)",
              background: "var(--color-secondary-600)",
            }}
          >
            <strong>{breakpointKey[0]}</strong> ({breakpointKey[1]}px)
          </div>
        )}
        <div
          style={{
            borderRadius: "var(--space-0-5)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <button
            style={{
              paddingLeft: styleProps.paddingLeft,
              paddingRight: styleProps.paddingRight,
              paddingTop: 16,
              paddingBottom: 16,

              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              background: "transparent",
              borderRadius: "var(--space-0-5)",
              border: "1.5px solid var(--color-gray-500)",
              color: "var(--color-gray-500)",
              fontSize: "var(--font-size-8)",
              fontFamily: "var(--font-family-heading)",
              textTransform: "uppercase",
            }}
          >
            Button
          </button>
          {debugView && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: styleProps.paddingLeft,
                  height: "100%",
                  background: "var(--color-secondary)",
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: styleProps.paddingRight,
                  height: "100%",
                  background: "var(--color-secondary)",
                  opacity: 0.5,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
