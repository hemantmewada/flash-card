import React, { useEffect, useRef, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
const AddTermsAndConditions = ({
  terms,
  addMore,
  remove,
  handleChangeTerm,
  handleChangeFile,
  errors,
  handleBlur,
}) => {
  // useRef for input fields
  const inputRefs = useRef([]);
  // Function to handle focusing on input field
  const focusInput = (index) => {
    inputRefs.current[index].focus();
  };

  return (
    <div className="pt-10">
      <div className="block p-6 bg-white border border-gray-200 rounded shadow">
        {terms.map((term, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4"
            >
              <div className="col-span-2 md:col-span-2">
                <div className="flex gap-4">
                  <div>
                    <div className="w-6 h-6 rounded-[50%] bg-red-400 text-white justify-center text-center">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Enter Term *
                    </label>
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={term.title}
                      onChange={(e) => handleChangeTerm(e, index)}
                      id="title"
                      type="text"
                      name="title"
                      onBlur={handleBlur}
                      placeholder="Enter Term"
                      className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />

                    {/* Display error for title */}
                    {errors &&
                      errors.terms &&
                      errors.terms[index] &&
                      errors.terms[index].title && (
                        <p className="text-red-500">
                          {errors.terms[index].title}
                        </p>
                      )}
                  </div>
                </div>
              </div>
              <div className="col-span-2 md:col-span-2">
                <label
                  htmlFor="definition"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Enter Definition *
                </label>
                <textarea
                  id="definition"
                  value={term.definition}
                  onChange={(e) => handleChangeTerm(e, index)}
                  onBlur={handleBlur}
                  name="definition"
                  type="text"
                  placeholder="Enter Definition"
                  rows="1"
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                ></textarea>
                {/* Display error for definition */}
                {errors &&
                  errors.terms &&
                  errors.terms[index] &&
                  errors.terms[index].definition && (
                    <p className="text-red-500">
                      {errors.terms[index].definition}
                    </p>
                  )}
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="pt-6">
                  {term.image ? (
                    <div className="flex gap-2">
                      <img
                        src={term.image}
                        alt="term image"
                        className="w-3/5 rounded"
                      />
                      <div className="gap-3 flex flex-col">
                        <LuTrash2
                          onClick={() => remove(index)}
                          className="cursor-pointer"
                          size={"30"}
                          color="#C5C9D5"
                        />
                        <div className="ml-1">
                          <FaRegEdit
                            onClick={() => focusInput(index)}
                            className="cursor-pointer"
                            size={"30"}
                            color="#C5C9D5"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        className="absolute pt-[13px] opacity-0 file1"
                        type="file"
                        onChange={(e) => {
                          handleChangeFile(e, index);
                        }}
                      />
                      <button className="border border-[#2342e8] text-[#2342e8] rounded w-full py-[10px] mt-1">
                        <span className="">Select Image</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <p onClick={addMore} className="text-[#2342e8] cursor-pointer">
          + Add more
        </p>
      </div>
    </div>
  );
};

export default AddTermsAndConditions;
