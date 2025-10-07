import * as React from "react";

const FileIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="67"
    height="66"
    fill="none"
    viewBox="0 0 67 66"
    style={{
      //   "--light": "var(--color-light-gray)",
      //   "--shadow": "var(--color-gray-900)",
      ...props.style,
    }}
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="var(--shadow)"
        d="m44.664 15.513-4.127 5.475-10.014-6.205L34.59 9.31zM50.73 20.621l-4.066 5.414-14.383 2.311 4.127-5.413zM32.53 20.498l-4.128 5.475-5.097-14.356 4.127-5.414z"
      ></path>
      <mask
        id="b"
        width="9"
        height="9"
        x="28"
        y="20"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path
          fill="#fff"
          d="m36.41 22.933-4.127 5.475c-1.578.243-3.338-.791-3.885-2.433l4.127-5.475c.546 1.582 2.306 2.677 3.884 2.433"
        ></path>
      </mask>
      <g mask="url(#b)">
        <path
          fill="var(--shadow)"
          d="m36.41 22.933-4.127 5.475c-1.578.243-3.338-.791-3.885-2.433l4.127-5.475c.546 1.582 2.306 2.677 3.884 2.433"
        ></path>
      </g>
      <path
        fill="var(--shadow)"
        d="m27.425 6.203-4.127 5.414-17.235 2.798 4.126-5.475zM60.926 49.211l-4.066 5.475-10.196-28.651 4.066-5.414z"
      ></path>
      <mask
        id="c"
        width="7"
        height="11"
        x="-1"
        y="5"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path
          fill="#fff"
          d="m.907 10.525 4.127-5.474c-.971 1.277-1.214 3.041-.607 4.805L.3 15.331c-.607-1.825-.303-3.589.607-4.806"
        ></path>
      </mask>
      <g mask="url(#c)">
        <path
          fill="var(--shadow)"
          d="M4.43 9.856.303 15.331c-.668-1.825-.364-3.589.607-4.806l4.127-5.474c-.971 1.277-1.214 2.98-.607 4.805"
        ></path>
      </g>
      <mask
        id="d"
        width="9"
        height="8"
        x="58"
        y="53"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path
          fill="#fff"
          d="m66.09 53.164-4.128 5.475c-.728.912-1.76 1.581-3.095 1.825l4.127-5.475c1.335-.243 2.427-.912 3.095-1.825"
        ></path>
      </mask>
      <g mask="url(#d)">
        <path
          fill="var(--shadow)"
          d="m66.09 53.164-4.128 5.475c-.728.912-1.76 1.581-3.095 1.825l4.127-5.475c1.335-.243 2.427-.912 3.095-1.825"
        ></path>
      </g>
      <path
        fill="var(--shadow)"
        d="m62.989 54.988-4.127 5.414-34.471 5.536 4.126-5.475zM20.75 55.66l-4.126 5.475L.359 15.33l4.067-5.475z"
      ></path>
      <path
        fill="var(--light)"
        d="M55.402 16.667c0 .061.06.122.121.183l11.228 31.51c1.092 3.163-.547 6.143-3.703 6.63l-34.531 5.474c-3.156.487-6.676-1.642-7.768-4.805L4.424 9.854c-1.093-3.163.546-6.143 3.762-6.63L28.274 0h.972c.12 0 .181 0 .303.06.364.062.728.244 1.031.427l23.305 14.416c.364.183.606.487.85.73.06.061.12.183.181.244.243.304.364.547.486.79m-28.949 38.08 34.471-5.536-10.195-28.59-14.323 2.312c-1.578.243-3.338-.791-3.884-2.433L27.424 6.205 10.19 8.942zm8.133-45.44 2.61 7.421 7.403-1.217z"
      ></path>
      <mask
        id="e"
        width="13"
        height="12"
        x="16"
        y="55"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path
          fill="#fff"
          d="m28.52 60.466-4.127 5.474c-3.156.487-6.676-1.642-7.768-4.805l4.127-5.475c1.092 3.163 4.612 5.353 7.768 4.806"
        ></path>
      </mask>
      <g mask="url(#e)">
        <path
          fill="var(--shadow)"
          d="m28.52 60.466-4.127 5.474c-3.156.487-6.676-1.642-7.768-4.805l4.127-5.475c1.092 3.163 4.612 5.353 7.768 4.806"
        ></path>
      </g>
      <path
        fill="var(--shadow)"
        d="m26.761 24.695-4.066 5.414-5.765.913 4.127-5.414z"
      ></path>
      <path
        fill="var(--shadow)"
        d="m21.057 25.609-4.126 5.413-2.064-5.718 4.127-5.413z"
      ></path>
      <path
        fill="var(--light)"
        d="m24.758 18.918 2.002 5.779-5.704.912-2.064-5.718z"
      ></path>
      <path
        fill="var(--shadow)"
        d="m48.06 33.336-4.128 5.475-22.94 3.71 4.127-5.474z"
      ></path>
      <path
        fill="var(--shadow)"
        d="m25.12 37.046-4.127 5.475-2.063-5.718 4.127-5.475z"
      ></path>
      <path
        fill="var(--light)"
        d="m23.055 31.328 23-3.71 2.003 5.717-22.94 3.71z"
      ></path>
      <path
        fill="var(--shadow)"
        d="m29.192 48.48-4.127 5.474-2.003-5.718 4.067-5.474z"
      ></path>
      <path
        fill="var(--shadow)"
        d="m52.13 44.832-4.127 5.414-22.94 3.71 4.126-5.474z"
      ></path>
      <path
        fill="var(--light)"
        d="m29.188 48.481-2.063-5.718 23-3.65 2.004 5.718z"
      ></path>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h67v66H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default FileIcon;
