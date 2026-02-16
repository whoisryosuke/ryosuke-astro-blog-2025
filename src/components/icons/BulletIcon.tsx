import * as React from "react";

const BulletIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.21 35.03">
    <defs>
      <clipPath id="a">
        <path
          fill="none"
          d="m32.12 21.81-6.77 9a10.8 10.8 0 0 1-7 4.08C11.16 36 3.32 31.17.79 24.07a11.41 11.41 0 0 1 1.3-10.86l6.76-9A11.41 11.41 0 0 0 7.56 15.1c2.53 7.1 10.37 11.9 17.5 10.79a10.77 10.77 0 0 0 7.06-4.08"
        ></path>
      </clipPath>
    </defs>
    <g style={{ isolation: "isolate" }}>
      <g clipPath="url(#a)" style={{ isolation: "isolate" }}>
        <path
          fill="#6b6a66"
          d="m32.12 21.81-6.77 9a10.8 10.8 0 0 1-7 4.08C11.16 36 3.32 31.17.79 24.07a11.41 11.41 0 0 1 1.3-10.86l6.76-9A11.41 11.41 0 0 0 7.56 15.1c2.53 7.1 10.37 11.9 17.5 10.79a10.77 10.77 0 0 0 7.06-4.08"
          style={{ isolation: "isolate" }}
        ></path>
      </g>
      <path
        fill="#cccac3"
        d="M15.9.17C23-1 30.88 3.86 33.41 11s-1.2 13.78-8.35 14.92-15-3.69-17.5-10.79S8.76 1.31 15.9.17"
      ></path>
    </g>
  </svg>
);

export default BulletIcon;
