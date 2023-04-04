import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

const AffEvent = () => {
  const { event } = useParams();
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [image, setImage] = useState("");
  const [affEvent, setAffEvent] = useState("");

  useEffect(() => {
    displayAffEvent();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayAffEvent = async () => {
    await axios
      .get(`http://localhost:8000/api/events/${event}`)
      .then((res) => {
        console.log(event);
        console.log(res.data);
        setAffEvent(res.data);
        setSites(res.data.site);
        setImage(res.data.pictureEvent);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navigation />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", display: "inline-flex" }}>
          <div className="container mt-5">
            <Row>
              <h2 className="mb-4 mt-5">{affEvent.titleEvent}</h2>
            </Row>

            <Row>
              <div className="col-12 col-sm-12 col-md-12 mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/storage/uploads/events/${image}`}
                    style={{
                      maxHeight: "500px",
                      maxWidth: "100%",
                      display: "block",
                      margin: "0 auto",
                      width: "auto",
                      height: "100%",
                    }}
                    alt={affEvent.pictureEvent}
                  />

                  <Card.Body className="cardbody">
                    <Card.Title className="cardtitle">
                      {affEvent.subtitleEvent}
                    </Card.Title>
                    <Card.Text className="cardtexte">
                      {affEvent.contentEvent}
                    </Card.Text>
                    <Button
                      className="btn-1 btn-sm mb-2  ms-2"
                      onClick={() => navigate(-1)}
                    >
                      Retour
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffEvent;
