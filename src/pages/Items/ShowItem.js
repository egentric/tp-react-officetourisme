import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowItem = () => {
  const [showItem, setShowItem] = useState([]);
  useEffect(() => {
    displayShowItem();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowItem = async () => {
    await axios.get("http://localhost:8000/api/items/${id}").then((res) => {
      setShowItem(res.data.data);
    });
  };
  const deleteShowItem = (id) => {
    axios.delete(`http://localhost:8000/api/items/${id}`).then(displayShowItem);
  };

  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Soustitre</th>
              <th>Contenu</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showItem.map((item) => (
              <tr key={item.id}>
                <td>{item.titleItem}</td>
                <td>{item.subtitleItem}</td>
                <td>{item.contentItem}</td>
                <td>{item.pictureItem}</td>
                <td>
                  <img
                    src={`http://localhost:8000/storage/uploads/${item.pictureItem}`}
                    alt={item.pictureItem}
                    width="75px"
                  />
                </td>
                <td>
                  <Link
                    to={`/items/edit/${item.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteShowItem(item.id);
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

export default ShowItem;
