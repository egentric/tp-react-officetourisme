import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";

const ShowUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState("");

  useEffect(() => {
    displayShowUser();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowUser = async () => {
    await axios
      .get(`http://localhost:8000/api/users/${user}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        // console.log("test");

        setShowUser(res.data.data);
        // console.log(showUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", display: "inline-flex" }}>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Mon Compte</h4>
                  <hr />
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <th>Prénom</th>
                        <td>{showUser.firstName}</td>
                      </tr>
                      <tr>
                        <th>Nom</th>
                        <td>{showUser.lastName}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{showUser.email}</td>
                      </tr>
                      <tr>
                        <th>Role</th>
                        <td>{showUser.role}</td>
                      </tr>
                      <tr>
                        <th>Actions</th>
                        <td>
                          <Link
                            to={`/users/edit/${showUser.id}`}
                            className="btn btn-2 btn-sm me-2"
                          >
                            Modifier
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
