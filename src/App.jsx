import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateFlashCard from "./pages/CreateFlashCard";
import MyFlashCards from "./pages/MyFlashCards";
import { ToastContainer } from "react-toast";
import Detail from "./components/flash-card/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateFlashCard />} />
        <Route path="/my-flashcards" element={<MyFlashCards />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
