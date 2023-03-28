import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    displayEvents();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayEvents = async () => {
    await axios.get("http://localhost:8000/api/events").then((res) => {
      setEvents(res.data.data);
    });
  };
  const deleteEvent = (id) => {
    axios.delete(`http://localhost:8000/api/events/${id}`).then(displayEvents);
  };

  return (
    <div>
      {/* <Navigation /> */}
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titres</th>
              <th>Soustitres</th>
              <th>Contenus</th>
              <th>Sites</th>
              <th>Photos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.titleEvent}</td>
                <td>{event.subtitleEvent}</td>
                <td>{event.contentEvent}</td>
                <td>
                  <ul>
                    {event.sites.map((site) => (
                      <li key={site.id}>{site.nameSite}</li>
                    ))}
                  </ul>
                </td>
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
                      deleteEvent(event.id);
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

export default Events;