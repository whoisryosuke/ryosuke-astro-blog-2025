import * as React from "react";
import type { SVGProps } from "react";
const TwitchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={62}
    height={62}
    fill="none"
    {...props}
  >
    <path
      className="logo"
      fill="var(--fill)"
      stroke="var(--stroke)"
      d="M44.214 15.5v15.293l-9.993 9.993h-4.572l-5.006 5.007v-5.007h-6.858V20.921l5.421-5.421zM23.643 34.929h5.142v4.707l4.707-4.707h4.572l4.864-4.865V16.786H23.643z"
    />
    <path
      className="logo"
      fill="var(--fill)"
      stroke="var(--stroke)"
      d="M38.501 21.786v5.857h-1.286v-5.857zM32.216 21.786v5.857H30.93v-5.857z"
    />
    <path
      fill="#E8E7E0"
      d="M31 1v.5c16.292 0 29.5 13.208 29.5 29.5h1C61.5 14.155 47.845.5 31 .5zm30 30h-.5c0 16.292-13.208 29.5-29.5 29.5v1c16.845 0 30.5-13.655 30.5-30.5zM31 61v-.5C14.708 60.5 1.5 47.292 1.5 31h-1C.5 47.845 14.155 61.5 31 61.5zM1 31h.5C1.5 14.708 14.708 1.5 31 1.5v-1C14.155.5.5 14.155.5 31z"
    />
  </svg>
);
export default TwitchIcon;
