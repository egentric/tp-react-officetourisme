import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import MapG from "../../components/Map";

const AffSites = () => {
  const { type } = useParams();
  const [affSites, setAffSites] = useState([]);

  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    displaySites();
    displayType();
  }, []);

  const displaySites = async () => {
    await axios
      .get(`http://localhost:8000/api/sites/type/${type}`)
      .then((res) => {
        setAffSites(res.data);
        console.log(affSites);

        // console.log(res.data);
        // console.log(setImage);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const displayType = async () => {
    await axios
      .get(`http://localhost:8000/api/types/${type}`)
      .then((res) => {
        setSelectedType(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const filteredSites = sites.filter(
  //     (site) => !selectedType || site.type_id === selectedType.id
  //   );

  return (
    <div style={{ display: "flex" }}>
      <Navigation />
      {/* <MapG /> */}
      <div style={{ flex: "1", display: "inline-flex" }}>
        <div className="container mt-5">
          <Row className="mt-5">
            <h2 className="mb-4">{selectedType.nameType}</h2>
          </Row>
          <Row style={{ justifyContent: "center" }}>
            {affSites.map((affSite) => (
              <div className="col-4 col-sm-12 col-md-4 mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/storage/uploads/sites/${affSite.pictureSite}`}
                    style={{
                      maxHeight: "220px",
                      maxWidth: "100%",
                      display: "block",
                      margin: "0 auto",
                      width: "auto",
                      height: "100%",
                    }}
                    alt={affSite.pictureSite}
                  />

                  <Card.Body>
                    <Card.Title>{affSite.nameSite}</Card.Title>
                    <Card.Text
                      className="cardtexte"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: affSite.descriptionSite,
                        }}
                      />
                    </Card.Text>
                    <Link
                      to={`/sites/aff/${affSite.id}`}
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
  );
};

export default AffSites;
