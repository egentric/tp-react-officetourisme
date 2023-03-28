import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    displayUsers();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayUsers = async () => {
    await axios.get("http://localhost:8000/api/users").then((res) => {
      setUsers(res.data.data);
    });
  };
  const deleteUser = (id) => {
    axios.delete(`http://localhost:8000/api/users/${id}`).then(displayUsers);
  };

  return (
    <div>
      <Navigation />
      <div className="container mt-5">
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
                <td>{user.firstNameUser}</td>
                <td>{user.lastNameUser}</td>
                <td>{user.emailUser}</td>
                <td>{user.roleUser}</td>
                <td>
                  <Link
                    to={`/users/edit/${user.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link>
                  <Button
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
  );
};
export default Users;
