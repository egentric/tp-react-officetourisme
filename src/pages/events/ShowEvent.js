import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowEvent = () => {
  const [showEvent, setShowEvent] = useState([]);
  useEffect(() => {
    displayShowEvent();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowEvent = async () => {
    await axios.get("http://localhost:8000/api/events/${id}").then((res) => {
      setShowEvent(res.data.data);
    });
  };
  const deleteShowEvent = (id) => {
    axios
      .delete(`http://localhost:8000/api/events/${id}`)
      .then(displayShowEvent);
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
            {showEvent.map((event) => (
              <tr key={event.id}>
                <td>{event.titleEvent}</td>
                <td>{event.subtitleEvent}</td>
                <td>{event.contentEvent}</td>
                <td>{event.pictureEvent}</td>
                <td>
                  <img
                    src={`http://localhost:8000/storage/uploads/${event.pictureEvent}`}
                    alt={event.pictureEvent}
                    width="75px"
                  />
                </td>
                <td>
                  <Link
                    to={`/events/edit/${event.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteShowEvent(event.id);
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

export default ShowEvent;
