import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    displayUsers();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayUsers = async () => {
    await axios
      .get("http://localhost:8000/api/users", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUsers(res.data.data);
      });
  };
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(displayUsers);
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
                  <h4 className="card-title">Utilisateurs</h4>
                  <hr />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Prénoms</th>
                        <th>Noms</th>
                        <th>Emails</th>
                        <th>Roles</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <Link
                              to={`/users/edit/${user.id}`}
                              className="btn btn-1 btn-sm me-2"
                            >
                              Modifier
                            </Link>
                            <Button
                              className="btn-sm"
                              variant="danger"
                              onClick={() => {
                                deleteUser(user.id);
                              }}
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
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
export default Users;
