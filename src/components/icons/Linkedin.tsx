import * as React from "react";
import type { SVGProps } from "react";
const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={62}
    height={62}
    fill="none"
    {...props}
  >
    <path
      stroke="#E8E7E0"
      d="M1 31C1 14.432 14.432 1 31 1c16.569 0 30 13.432 30 30 0 16.569-13.431 30-30 30C14.432 61 1 47.569 1 31Z"
      clipRule="evenodd"
    />
    <path
      className="logo"
      fill="var(--fill)"
      fillRule="evenodd"
      stroke="var(--stroke)"
      d="M22.201 25.847h-6.799v20.427h6.799zM22.649 19.528C22.603 17.526 21.172 16 18.845 16S15 17.526 15 19.528c0 1.962 1.476 3.531 3.758 3.531h.044c2.37 0 3.846-1.57 3.846-3.53ZM46.72 34.562c0-6.274-3.354-9.194-7.828-9.194-3.61 0-5.225 1.982-6.128 3.373v-2.893h-6.8c.09 1.917 0 20.427 0 20.427h6.8V34.867c0-.61.044-1.22.224-1.657.492-1.22 1.61-2.482 3.489-2.482 2.46 0 3.445 1.873 3.445 4.618v10.929h6.798z"
      clipRule="evenodd"
    />
  </svg>
);
export default LinkedinIcon;
