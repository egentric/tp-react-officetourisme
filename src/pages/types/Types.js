import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Types = () => {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    displayTypes();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayTypes = async () => {
    await axios.get("http://localhost:8000/api/types").then((res) => {
      setTypes(res.data.data);
    });
  };
  const deleteType = (id) => {
    axios
      .delete(`http://localhost:8000/api/types/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(displayTypes);
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
                  <h4 className="card-title">Types</h4>
                  <hr />
                  <Link
                    to={`/types/add`}
                    className="btn btn-2 btn-sm me-2 mb-2"
                  >
                    Nouveau
                  </Link>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Types</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {types.map((type) => (
                        <tr key={type.id}>
                          <td>{type.nameType}</td>
                          <td>
                            <Link
                              to={`/types/edit/${type.id}`}
                              className="btn btn-1 btn-sm me-2"
                            >
                              Edit
                            </Link>
                            <Button
                              className="btn-sm"
                              variant="danger"
                              onClick={() => {
                                deleteType(type.id);
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
export default Types;
