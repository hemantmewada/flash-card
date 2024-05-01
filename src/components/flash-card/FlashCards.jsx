import React from "react";
import FlashCard from "./FlashCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FlashCards = () => {
  const cards = useSelector((state) => state.cards);
  // console.log(cards);
  const navigate = useNavigate();
  const navigateToCreateFlashCard = () => {
    navigate("/");
  };
  return (
    <>
      <div className="pt-10">
        <div className="block p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-4">
            {cards.length === 0 && (
              <div>
                <p>No Flash Cards were found.</p>
                <button
                  onClick={navigateToCreateFlashCard}
                  className="mt-4 py-2 w-3/4 px-4 ms-2 text-sm font-bold text-[#cc1818] focus:outline-none rounded-lg border-2 border-[#cc1818]"
                >
                  Create a Flash Card
                </button>
              </div>
            )}

            {cards.map((group, index) => (
              <FlashCard {...group} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlashCards;
