import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { LiaShareSolid } from "react-icons/lia";
import { TbDownload } from "react-icons/tb";
import { MdOutlinePrint } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toast";
import Header from "../Header";
import Tabs from "../Tabs";
import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

const Detail = () => {
  const { id } = useParams();
  const cards = useSelector((state) => state.cards);
  const card = cards.filter((c) => c.id == id)[0];
  const navigate = useNavigate();
  const navigateToMyCards = () => {
    navigate("/my-flashcards");
  };
  const [selectedTerm, setSelectedTerm] = useState({});
  useEffect(() => {
    // console.log(card.terms[0]);
    setSelectedTerm(card?.terms[0]);
  }, []);
  const prev = () => {
    const prevIndex = selectedTerm.id - 1;
    if (prevIndex >= 0) {
      setSelectedTerm(card.terms[prevIndex]);
    } else {
      setSelectedTerm(card.terms[card.terms.length - 1]);
    }
  };
  const next = () => {
    const nextIndex = selectedTerm.id + 1;
    if (nextIndex < card.terms.length) {
      setSelectedTerm(card.terms[nextIndex]);
    } else {
      setSelectedTerm(card.terms[0]);
    }
  };
  const setTerm = (index) => {
    setSelectedTerm(card.terms[index]);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const url = window.location.href;
  const description = "It is just a local url (browser specific)";
  const copy = () => {
    if (navigator.clipboard.writeText(url)) {
      setIsOpen(false);
      toast.success("copied.");
    }
  };
  const borderRadiusStyle = {
    borderRadius: "5px",
    cursor: "pointer",
  };
  function ShareWebAPI(description) {
    if (navigator.share) {
      navigator
        .share({
          title: description,
          url: url,
        })
        .catch((err) => alert("Error Sharing: " + err));
    }
  }

  return (
    <>
      <Header />
      <div className="px-5 sm:px-20 md:px-40 py-5 sm:py-10">
        <Tabs />
        <div className="pt-5">
          <div className="flex flex-col">
            <div className="flex flex-row items-start gap-3">
              <div>
                <IoIosArrowRoundBack
                  className="cursor-pointer"
                  size={"50"}
                  onClick={navigateToMyCards}
                />
              </div>
              <div className="mt-2">
                <h1 className="text-xl font-bold mb-1">{card?.groupName}</h1>
                <p>{card?.groupDescription}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full pt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mb-4">
              {/* flahs cards */}
              <div className="col-span-2 md:col-span-1 pt-0 mt-8">
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow ">
                  <div className="flex flex-col p-5">
                    <p className="text-gray-500 text-sm mb-2">
                      Term & Conditions
                    </p>
                    <div className="w-full h-[2px] bg-gray-300 mb-2"></div>
                    {card?.terms.map((term, index) => {
                      return (
                        <div key={index} className="py-1 cursor-pointer">
                          <p
                            className={`${
                              term.id === selectedTerm?.id
                                ? "text-[#cc1818]"
                                : ""
                            }`}
                            onClick={() => setTerm(term.id)}
                          >
                            {term.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* detail */}
              <div className="col-span-2 md:col-span-3 pt-0 mt-8">
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow ">
                  <div className="flex flex-col p-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <div>
                        <img
                          src={
                            selectedTerm?.image
                              ? selectedTerm?.image
                              : "/assets/images/term_and_condition.png"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-gray-500">
                          {selectedTerm?.definition}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-10 text-center items-center justify-center mt-10">
                  <div className="cursor-pointer" onClick={prev}>
                    <FaAngleLeft size={"25"} color="gray" />
                  </div>
                  <p className="text-gray-500">
                    {selectedTerm?.id + 1}/{card?.terms.length}
                  </p>
                  <div className="cursor-pointer" onClick={next}>
                    <FaAngleRight size={"25"} color="gray" />
                  </div>
                </div>
              </div>
              {/* shre download and print */}
              <div className="col-span-2 md:col-span-1 pt-0 mt-8">
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow p-3">
                  <div
                    onClick={openModal}
                    className="flex flex-row items-center gap-2 cursor-pointer"
                  >
                    <LiaShareSolid size={"20"} color="gray" />
                    <p className="text-gray-500">Share</p>
                  </div>
                </div>
                <div className="mt-3 w-full bg-white border border-gray-200 rounded-lg shadow p-3">
                  <div className="flex flex-row items-center gap-2">
                    <TbDownload size={"20"} color="gray" />
                    <p className="text-gray-500">Download</p>
                  </div>
                </div>
                <div className="mt-3 w-full bg-white border border-gray-200 rounded-lg shadow p-3">
                  <div
                    onClick={() => window.print()}
                    className="flex flex-row items-center gap-2 cursor-pointer"
                  >
                    <MdOutlinePrint size={"20"} color="gray" />
                    <p className="text-gray-500">Print</p>
                  </div>
                </div>
              </div>
              {/* end */}
            </div>
          </div>
        </div>
        {/* modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5">
              <h3 className="text-lg text-gray-500 dark:text-gray-400">
                Share
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                data-modal-toggle="course-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="px-4 pb-4 md:px-5 md:pb-5">
              <label
                htmlFor="course-url"
                className="text-sm font-medium text-gray-900 dark:text-white mb-2 block"
              >
                Share the course link below with your friends:
              </label>
              <div className="relative mb-4">
                <input
                  id="course-url"
                  type="text"
                  className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={window.location.href}
                  disabled
                  readOnly
                />
                <button
                  onClick={copy}
                  data-copy-to-clipboard-target="course-url"
                  data-tooltip-target="tooltip-course-url"
                  className="absolute right-[46px] top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                >
                  <span id="default-icon-course-url">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
                      />
                    </svg>
                  </span>
                </button>
                <button
                  onClick={copy}
                  data-copy-to-clipboard-target="course-url"
                  data-tooltip-target="tooltip-course-url"
                  className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                >
                  <span id="default-icon-course-url">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth={2}
                        d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex flex-row gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
                    description
                  )}`}
                  target="_blank"
                >
                  <TwitterIcon size={32} style={borderRadiusStyle} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                  target="_blank"
                >
                  <FacebookIcon size={32} style={borderRadiusStyle} />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
                  target="_blank"
                >
                  <LinkedinIcon size={32} style={borderRadiusStyle} />
                </a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href={`whatsapp://send?text=${url}`}
                >
                  <WhatsappIcon size={32} style={borderRadiusStyle} />
                </a>
                <a
                  href={`mailto:info@example.com?&subject=You+have+to+See+this!&cc=&bcc=&body=Check+out+this+site:${url}\n${encodeURI(
                    description
                  )}`}
                  target="_blank"
                >
                  <EmailIcon size={32} style={borderRadiusStyle} />
                </a>
              </div>
            </div>
          </div>
        </Modal>
        {/* modal */}
      </div>
    </>
  );
};

export default Detail;
