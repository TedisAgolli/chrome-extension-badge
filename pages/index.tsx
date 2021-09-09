import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [extensionLink, setExtensionLink] = useState("");
  const [extensionId, setExtensionId] = useState("");
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
    <div className={`mx-auto`}>
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
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <button
          type="submit"
          className=" mx-auto items-center mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate
        </button>
        <div className="m-3 flex flex-col space-y-2">
          {extensionId && <img src={`/api/installs/${extensionId}.svg`}></img>}
          {extensionId && <img src={`/api/reviews/${extensionId}.svg`}></img>}
        </div>
      </form>
    </div>
  );
};

export default Home;
