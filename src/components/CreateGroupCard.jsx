import React, { useEffect, useState } from "react";
import { colors, groups } from "./../utils/index";
import { MdOutlineUploadFile } from "react-icons/md";
import { ErrorMessage } from "formik";

const CreateGroupCard = ({
  handleBlur,
  groupName,
  groupImage,
  handleChangeGroupImage,
  groupDescription,
  handleChange,
}) => {
  return (
    <div className="pt-10">
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="groupName"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Group Name
            </label>
            <select
              name="groupName"
              id="groupName"
              value={groupName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Group Name</option>
              {groups.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <ErrorMessage
              className="text-red-600"
              component="span"
              name="groupName"
            />
          </div>
          <div>
            <div
              className={`w-38 md:w-48 mt-7 p-1 gap-4 border-2 border-[#A2A9BD] rounded-md text-[#2342e8]`}
            >
              <label
                htmlFor="file"
                className="w-full flex items-center cursor-pointer"
              >
                <input
                  className="hidden"
                  type="file"
                  id="file"
                  onChange={handleChangeGroupImage}
                />
                <MdOutlineUploadFile size={"30"} />
                <p className="text-[14px] md:text-[16px]">Upload Image</p>
              </label>
            </div>
          </div>
          <div>
            {groupImage && (
              <a href={groupImage} target="_blank">
                <img
                  className="max-h-[250px]"
                  src={groupImage}
                  alt="group image"
                />
              </a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full md:w-[75%]">
          <label
            htmlFor="groupDescription"
            className="block text-sm font-medium text-gray-900 "
          >
            Add Description
          </label>
          <textarea
            rows={"5"}
            value={groupDescription}
            name="groupDescription"
            id="groupDescription"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe the roles, responsibility, responsibility, skills required for the job and help candidate understand the role better."
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          ></textarea>
          <ErrorMessage
            className="text-red-600"
            component="span"
            name="groupDescription"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateGroupCard;
