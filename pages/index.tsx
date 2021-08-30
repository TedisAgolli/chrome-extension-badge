import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
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
    <div className={styles.container}>
      <form onSubmit={submitForm}>
        <p>Extension Link</p>
        <input
          name="extensionLink"
          onChange={handleChange}
          value={extensionLink}
        ></input>
        <button>Generate</button>
        <div>{extensionId && <img src={`/api/${extensionId}.svg`}></img>}</div>
      </form>
    </div>
  );
};

export default Home;
