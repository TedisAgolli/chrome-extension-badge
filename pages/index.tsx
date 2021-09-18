import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import "tippy.js/dist/tippy.css"; // optional for styling
import Badge from "./Badge";

const EXAMPLE_INSTALLS =
  "https://extensionbadge.com/api/installs/iigdkhmjendealedklplakommgjpnhpg.svg";
const EXAMPLE_RATINGS =
  "https://extensionbadge.com/api/ratings/iigdkhmjendealedklplakommgjpnhpg.svg";
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

const Home: NextPage = () => {
  const [extensionLink, setExtensionLink] = useState("");
  const [extensionId, setExtensionId] = useState("");

  function getInstallsLink(extensionId: string) {
    return `api/installs/${extensionId}.svg`;
  }

  function getRatingsLink(extensionId: string) {
    return `api/ratings/${extensionId}.svg`;
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setExtensionLink(event.target.value);
  }
  function submitForm(event: React.FormEvent) {
    event.preventDefault();
    // https://chrome.google.com/webstore/detail/readwise-new-tab/iigdkhmjendealedklplakommgjpnhpg?hl=en
    const extensionId = extensionLink.split("/")[6].split("?")[0];
    setExtensionId(extensionId);
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-extrabold text-center">
        Chrome Extension Installs and Rating badge
      </h1>
      <div className="flex flex-col items-center mt-3">
        <Badge badgeLink={EXAMPLE_INSTALLS} />
        <Badge badgeLink={EXAMPLE_RATINGS} />
      </div>

      <div className="mt-10">
        <form onSubmit={submitForm}>
          <div>
            <label
              htmlFor="extensionLink"
              className="block text-sm font-medium text-gray-700"
            >
              Extension Link
            </label>
            <div className="mt-1">
              <input
                name="extensionLink"
                onChange={handleChange}
                value={extensionLink}
                type="text"
                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="https://chrome.google.com/webstore/detail/readwise-new-tab/iigdkhmjendealedklplakommgjpnhpg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto items-center mt-2 px-4 py-2 border border-transparent text-sm font-bold rounded-full shadow-sm text-white bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Generate
          </button>
          <div className="m-3 flex flex-col space-y-2 max-w-sm">
            <div className="flex">
              {extensionId && (
                <Badge
                  badgeLink={`${window.location.href}${getInstallsLink(
                    extensionId
                  )}`}
                />
              )}
            </div>
            <div className="flex">
              {extensionId && (
                <Badge
                  badgeLink={`${window.location.href}${getRatingsLink(
                    extensionId
                  )}`}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
