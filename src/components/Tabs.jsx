import React from "react";
import { Link, useLocation } from "react-router-dom";
import { colors } from "../utils";

const Tabs = () => {
  const location = useLocation();
  const activeClasses =
    "inline-block p-4 font-semibold text-md border-b-2 text-[#cc1818] border-[#cc1818] active";
  const notActiveClassess =
    "inline-block p-4 font-semibold text-md border-b-2 border-transparent";
  return (
    <div>
      <h1 className="text-lg font-semibold">Create FlashCard</h1>
      {/* tabs */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-400 ">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <Link
              to={"/"}
              className={
                location.pathname == "/" ? activeClasses : notActiveClassess
              }
            >
              Create New
            </Link>
          </li>
          <li className="me-2">
            <Link
              to={"/my-flashcards"}
              className={
                location.pathname == "/my-flashcards" ||
                location.pathname.substring(0, 7) == "/detail"
                  ? activeClasses
                  : notActiveClassess
              }
            >
              My Flashcard
            </Link>
          </li>
        </ul>
      </div>
      {/* tabs */}
    </div>
  );
};

export default Tabs;
