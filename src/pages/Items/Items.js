import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <Navigation />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titres</th>
              <th>Soustitres</th>
              <th>Contenus</th>
              <th>Photos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
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
  );
};
export default Items;
