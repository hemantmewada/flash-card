import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../../redux/state";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";

const FlashCard = (props) => {
  // console.log(props);
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  const remove = (id) => {
    if (confirm("Are you sure do you want to delete?")) {
      const prev = cards;
      const remaining = prev.filter((p) => p.id != id);
      localStorage.setItem("cards", JSON.stringify(remaining));
      dispatch(setCards(remaining));
      toast.success("Flash Card removed Successfully.");
    }
  };
  const navigate = useNavigate();
  const navigateToDetailPage = () => {
    navigate(`/detail/${props.id}`);
  };
  return (
    <div className="pt-0 mt-8">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
        <div className="flex flex-col items-center pb-10 relative pt-16 text-center p-5">
          <div className="absolute top-[-40px]">
            {props.groupImage ? (
              <img
                className="w-20 h-20 mb-3 bg-[#c3c5c9] rounded-full object-cover"
                src={props.groupImage}
                alt="group image"
              />
            ) : (
              <div className="w-20 h-20 mb-3 bg-[#edf8f8] rounded-full"></div>
            )}
          </div>
          <div className="absolute right-2 top-2">
            <LuTrash2
              onClick={() => remove(props.id)}
              className="cursor-pointer"
              size={"30"}
              color="#cc1818"
            />
          </div>
          <h5 className="font-bold">{props.groupName}</h5>
          <span className="text-sm text-gray-500 ">
            {props.groupDescription.length > 75
              ? `${props.groupDescription.substring(0, 75)}...`
              : props.groupDescription}
          </span>
          <p className="mt-4 text-sm text-gray-500">
            {props.terms.length} T&C's
          </p>
          <button
            onClick={navigateToDetailPage}
            className="mt-4 py-2 w-3/4 px-4 ms-2 text-sm font-bold text-[#cc1818] focus:outline-none bg-white rounded-lg border-2 border-[#cc1818]"
          >
            View Cards
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
