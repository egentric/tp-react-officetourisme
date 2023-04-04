import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";

import axios from "axios";

const AffEvents = () => {
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

  return (
    <div>
      <Navigation />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", display: "inline-flex" }}>
          <div className="container mt-5">
            <Row>
              <h2 className="mb-4 mt-5">Tout nos Evénements</h2>
            </Row>

            <Row>
              {events.map((event) => (
                <div className="col-6 col-sm-12 col-md-6 mb-4">
                  <Card className="d-flex flex-row">
                    <Card.Img
                      variant="left"
                      src={`http://localhost:8000/storage/uploads/events/${event.pictureEvent}`}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "200px",
                        display: "block",
                        margin: "0 auto",
                        width: "100%",
                        height: "auto",
                      }}
                      alt={event.pictureEvent}
                    />
                    <Card.Body className="cardbody">
                      <div className="cardtitle">
                        <Card.Title>{event.titleEvent}</Card.Title>
                        <Card.Subtitle>{event.subtitleEvent}</Card.Subtitle>
                      </div>
                      <Card.Text
                        className="cardtexte"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {event.contentEvent}
                      </Card.Text>{" "}
                      <Link
                        to={`/events/aff/${event.id}`}
                        className="btn btn-2 btn-sm ms-2 mb-2"
                      >
                        Lire la suite
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffEvents;
