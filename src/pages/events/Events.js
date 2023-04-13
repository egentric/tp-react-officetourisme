import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
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
    axios
      .delete(`http://localhost:8000/api/events/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(displayEvents);
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
                  <h4 className="card-title">Evénements</h4>
                  <hr />
                  <Link
                    to={`/events/add`}
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
                        <th>Sites</th>
                        <th>Photos</th> */}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event.id}>
                          <td>{event.titleEvent}</td>
                          <td>{event.subtitleEvent}</td>
                          {/* <td>{event.contentEvent}</td> */}
                          {/* <td>
                            <ul>
                              {event.sites.map((site) => (
                                <li key={site.id}>{site.nameSite}</li>
                              ))}
                            </ul>
                          </td> */}
                          {/* <td>{event.pictureEvent}</td>
                          <td>
                            <img
                              src={`http://localhost:8000/storage/uploads/${event.pictureEvent}`}
                              alt={event.pictureEvent}
                              width="75px"
                            />
                          </td> */}
                          <td>
                            <Link
                              to={`/events/show/${event.id}`}
                              className="btn btn-2 btn-sm me-2"
                            >
                              Voir
                            </Link>

                            <Link
                              to={`/events/edit/${event.id}`}
                              className="btn btn-1 btn-sm me-2"
                            >
                              Modifier
                            </Link>
                            <Button
                              className="btn-sm "
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
