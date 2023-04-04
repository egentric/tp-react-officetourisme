import React, { useEffect, useState } from "react";
import CarouselHome from "../components/CarouselHome";
import Navigation from "../components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";

import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    displayEvents();
    displayItems();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayEvents = async () => {
    await axios.get("http://localhost:8000/api/events").then((res) => {
      const allEvents = res.data.data;
      const lastThreeEvents = allEvents.slice(-3);
      setEvents(lastThreeEvents);
    });
  };

  const displayItems = async () => {
    await axios.get("http://localhost:8000/api/items").then((res) => {
      const allItems = res.data.data;
      const lastThreeItems = allItems.slice(-3);
      setItems(lastThreeItems);
    });
  };

  return (
    <div>
      <Navigation />
      <CarouselHome />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", display: "inline-flex" }}>
          <div className="container mt-5">
            <Row>
              <h2 className="mb-4">Les 3 derniers Evénements publiés</h2>
            </Row>
            <Row>
              {events.map((event) => (
                <div className="col-4 col-sm-12 col-md-4 mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8000/storage/uploads/events/${event.pictureEvent}`}
                      style={{
                        maxHeight: "220px",
                        maxWidth: "100%",
                        display: "block",
                        margin: "0 auto",
                        width: "auto",
                        height: "100%",
                      }}
                      alt={event.pictureEvent}
                    />

                    <Card.Body>
                      <Card.Title>{event.titleEvent}</Card.Title>
                      <Card.Text>{event.subtitleEvent}</Card.Text>
                      <Link
                        to={`/events/show/${event.id}`}
                        className="btn btn-2 btn-sm me-2"
                      >
                        Lire la suite
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
            <Row>
              <h2 className="mb-4 mt-5">Les 3 derniers Articles publiés</h2>
            </Row>
            <Row>
              {items.map((item) => (
                <div className="col-4 col-sm-12 col-md-4 mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8000/storage/uploads/items/${item.pictureItem}`}
                      style={{
                        maxHeight: "220px",
                        maxWidth: "100%",
                        display: "block",
                        margin: "0 auto",
                        width: "auto",
                        height: "100%",
                      }}
                      alt={item.pictureItem}
                    />

                    <Card.Body>
                      <Card.Title>{item.titleItem}</Card.Title>
                      <Card.Text>{item.subtitleItem}</Card.Text>
                      <Link
                        to={`/items/aff/${item.id}`}
                        className="btn btn-2 btn-sm me-2"
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

export default Home;
