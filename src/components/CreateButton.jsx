import React from "react";

const CreateButton = () => {
  return (
    <div className="pt-10">
      <div className="flex justify-center align-middle">
        <button
          type="submit"
          className="border border-[#cc1818] bg-[#cc1818] text-white py-[0.4rem] rounded-lg w-44"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateButton;
