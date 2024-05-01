import React from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import FlashCards from "../components/flash-card/FlashCards";

const MyFlashCards = () => {
  return (
    <>
      <Header />
      <div className="px-5 sm:px-20 md:px-40 py-5 sm:py-10">
        <Tabs />
        <FlashCards />
      </div>
    </>
  );
};

export default MyFlashCards;
