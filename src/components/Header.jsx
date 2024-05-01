import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-white border-gray-200 shadow-lg shadow-gray-500/5">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/assets/images/almabetter.png"
            className="h-6"
            alt="Almabetter Logo"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
