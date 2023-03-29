import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const Items = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    displayItems();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayItems = async () => {
    await axios.get("http://localhost:8000/api/items").then((res) => {
      setItems(res.data.data);
    });
  };
  const deleteItem = (id) => {
    axios.delete(`http://localhost:8000/api/items/${id}`).then(displayItems);
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
                  <h4 className="card-title">Articles</h4>
                  <hr />
                  <Link
                    to={`/items/add`}
                    className="btn btn-2 btn-sm me-2 mb-2"
                  >
                    Nouveau
                  </Link>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Titres</th>
                        <th>Soustitres</th>
                        {/* <th>Contenus</th>
                          <th>Photos</th> */}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.titleItem}</td>
                          <td>{item.subtitleItem}</td>
                          {/* <td>{item.contentItem}</td>
                            <td>{item.pictureItem}</td> */}
                          {/* <td>
                              <img
                                src={`http://localhost:8000/storage/uploads/${item.pictureItem}`}
                                alt={item.pictureItem}
                                width="75px"
                              />
                            </td> */}
                          <td>
                            <Link
                              to={`/items/show/${item.id}`}
                              className="btn btn-2 btn-sm me-2"
                            >
                              Voir
                            </Link>
                            <Link
                              to={`/items/edit/${item.id}`}
                              className="btn btn-1 btn-sm me-2"
                            >
                              Edit
                            </Link>
                            <Button
                              className="btn-sm"
                              variant="danger"
                              onClick={() => {
                                deleteItem(item.id);
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
export default Items;
