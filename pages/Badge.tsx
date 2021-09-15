import React, { useEffect } from "react";
import Clipboard from "react-clipboard.js";
import tippy from "tippy.js";
const copyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
    />
  </svg>
);
interface Props {
  badgeLink: string;
}
function Badge(props: Props) {
  const { badgeLink } = props;
  useEffect(() => {
    tippy("button.copy-btn", {
      content: "Copied!",
      trigger: "click",
    });
    return () => {};
  }, []);
  return (
    <div className="flex">
      <a href={badgeLink}>
        <img src={badgeLink}></img>
      </a>
      <Clipboard
        component="button"
        className="copy-btn"
        data-clipboard-text={badgeLink}
      >
        {copyIcon}
      </Clipboard>
    </div>
  );
}

export default Badge;
