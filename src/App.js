import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./pages/About";
import Home from "./pages/layouts/Home";
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
// import AddComment from "./pages/comments/AddComment";
import ShowComment from "./pages/comments/ShowComment";
import CommentUser from "./pages/comments/CommentsUser";

import Contacts from "./pages/contacts/Contacts";
import AddContact from "./pages/contacts/AddContact";
import ShowContact from "./pages/contacts/ShowContact";

import Sites from "./pages/sites/Sites";
import AddSite from "./pages/sites/AddSite";
import EditSite from "./pages/sites/EditSite";
import ShowSite from "./pages/sites/ShowSite";
import AffSites from "./pages/sites/AffSites";
import AffSite from "./pages/sites/AffSite";

import Types from "./pages/types/Types";
import AddType from "./pages/types/AddType";
import EditType from "./pages/types/EditType";

import Users from "./pages/users/Users";
import EditUser from "./pages/users/EditUser";
import ShowUser from "./pages/users/ShowUser";

import Dashboard from "./pages/layouts/Dashboard";

import Login from "./pages/layouts/Login";
import Register from "./pages/layouts/Register";
import Noaccess from "./pages/layouts/Noaccess";

import React, { useState, useEffect } from "react";
import axios from "axios";

// import View from "./pages/View";

function App() {
  // On récupère role_id
  const [role, setRole] = useState([]);

  const displayUsers = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/current-user`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setRole(res.data.role_id);
      });
  };
  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/items" element={role == 1 ? <Items /> : <Noaccess />} />
        <Route
          path="/items/add"
          element={role == 1 ? <AddItem /> : <Noaccess />}
        />
        <Route
          path="/items/edit/:item"
          element={role == 1 ? <EditItem /> : <Noaccess />}
        />
        <Route
          path="/items/show/:item"
          element={role == 1 ? <ShowItem /> : <Noaccess />}
        />
        <Route path="/items/affs" element={<AffItems />} />
        <Route path="/items/aff/:item" element={<AffItem />} />

        <Route path="/events" element={role == 1 ? <Events /> : <Noaccess />} />
        <Route
          path="/events/add"
          element={role == 1 ? <AddEvent /> : <Noaccess />}
        />
        <Route
          path="/events/edit/:event"
          element={role == 1 ? <EditEvent /> : <Noaccess />}
        />
        <Route
          path="/events/show/:event"
          element={role == 1 ? <ShowEvent /> : <Noaccess />}
        />
        <Route path="/events/affs" element={<AffEvents />} />
        <Route path="/events/aff/:event" element={<AffEvent />} />

        <Route
          path="/comments"
          element={role == 1 ? <Comments /> : <Noaccess />}
        />
        {/* <Route path="/comments/add" element={<AddComment />} /> */}
        <Route
          path="/comments/show/:comment"
          element={role == 1 || role == 2 ? <ShowComment /> : <Noaccess />}
        />
        <Route
          path="/comments/user/:user"
          element={role == 2 ? <CommentUser /> : <Noaccess />}
        />

        <Route
          path="/contacts"
          element={role == 1 ? <Contacts /> : <Noaccess />}
        />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route
          path="/contacts/show/:contact"
          element={role == 1 ? <ShowContact /> : <Noaccess />}
        />

        <Route path="/sites" element={role == 1 ? <Sites /> : <Noaccess />} />
        <Route
          path="/sites/add"
          element={role == 1 ? <AddSite /> : <Noaccess />}
        />
        <Route
          path="/sites/edit/:site"
          element={role == 1 ? <EditSite /> : <Noaccess />}
        />
        <Route
          path="/sites/show/:site"
          element={role == 1 ? <ShowSite /> : <Noaccess />}
        />
        <Route path="/sites/affs/:type" element={<AffSites />} />
        <Route path="/sites/aff/:site" element={<AffSite />} />

        <Route path="/types" element={role == 1 ? <Types /> : <Noaccess />} />
        <Route
          path="/types/add"
          element={role == 1 ? <AddType /> : <Noaccess />}
        />
        <Route
          path="/types/edit/:type"
          element={role == 1 ? <EditType /> : <Noaccess />}
        />

        <Route path="/users" element={role == 1 ? <Users /> : <Noaccess />} />
        <Route
          path="/users/edit/:user"
          element={role == 1 || role == 2 ? <EditUser /> : <Noaccess />}
        />
        <Route
          path="/users/show/:user"
          element={role == 1 || role == 2 ? <ShowUser /> : <Noaccess />}
        />

        <Route
          path="/dashboard/:user"
          element={role == 1 || role == 2 ? <Dashboard /> : <Noaccess />}
        />

        {/* path="*" fonctionne si jamais l'url ne correspond à rien de déclaré au dessus */}
        <Route path="*" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Noaccess" element={<Noaccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
