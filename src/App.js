import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./pages/About";
import Home from "./pages/Home";
import Items from "./pages/Items/Items";
import AddItem from "./pages/Items/AddItem";
import EditItem from "./pages/Items/EditItem";
import ShowItem from "./pages/Items/ShowItem";
import AffItems from "./pages/Items/AffItems";
import AffItem from "./pages/Items/AffItem";

import ShowEvent from "./pages/events/ShowEvent";
import Events from "./pages/events/Events";
import AddEvent from "./pages/events/AddEvent";
import EditEvent from "./pages/events/EditEvent";
import AffEvents from "./pages/events/AffEvents";
import AffEvent from "./pages/events/AffEvent";

import Comments from "./pages/comments/Comments";
import AddComment from "./pages/comments/AddComment";
import ShowComment from "./pages/comments/ShowComment";

import Contacts from "./pages/contacts/Contacts";
import AddContact from "./pages/contacts/AddContact";
import ShowContact from "./pages/contacts/ShowContact";

import Sites from "./pages/sites/Sites";
import AddSite from "./pages/sites/AddSite";
import EditSite from "./pages/sites/EditSite";
import ShowSite from "./pages/sites/ShowSite";

import Types from "./pages/types/Types";
import AddType from "./pages/types/AddType";
import EditType from "./pages/types/EditType";

import Users from "./pages/users/Users";
import EditUser from "./pages/users/EditUser";

import Dashboard from "./pages/Dashboard";

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
        <Route path="/items/affs" element={<AffItems />} />
        <Route path="/items/aff/:item" element={<AffItem />} />

        <Route path="/events" element={<Events />} />
        <Route path="/events/add" element={<AddEvent />} />
        <Route path="/events/edit/:event" element={<EditEvent />} />
        <Route path="/events/show/:event" element={<ShowEvent />} />
        <Route path="/events/affs" element={<AffEvents />} />
        <Route path="/events/aff/:event" element={<AffEvent />} />

        <Route path="/comments" element={<Comments />} />
        <Route path="/comments/add" element={<AddComment />} />
        <Route path="/comments/show/:comment" element={<ShowComment />} />

        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/show/:contact" element={<ShowContact />} />

        <Route path="/sites" element={<Sites />} />
        <Route path="/sites/add" element={<AddSite />} />
        <Route path="/sites/edit/:site" element={<EditSite />} />
        <Route path="/sites/show/:site" element={<ShowSite />} />

        <Route path="/types" element={<Types />} />
        <Route path="/types/add" element={<AddType />} />
        <Route path="/types/edit/:type" element={<EditType />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/edit/:user" element={<EditUser />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* path="*" fonctionne si jamais l'url ne correspond à rien de déclaré au dessus */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
