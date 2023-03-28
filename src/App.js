import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./pages/About";
import Home from "./pages/Home";
import Items from "./pages/Items/Items";
import AddItem from "./pages/Items/AddItem";
import EditItem from "./pages/Items/EditItem";
import ShowItem from "./pages/Items/ShowItem";

// import View from "./pages/View";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/add" element={<AddItem />} />
        <Route path="/items/edit/:item" element={<EditItem />} />
        <Route path="/items/show/:item" element={<ShowItem />} />

        {/* path="*" fonctionne si jamais l'url ne correspond à rien de déclaré au dessus */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
