import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Map from "../../components/Map";

const AffSite = () => {
  const { site } = useParams();
  const navigate = useNavigate();
  const [affSite, setAffSite] = useState("");

  useEffect(() => {
    displayAffSite();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayAffSite = async () => {
    await axios
      .get(`http://localhost:8000/api/sites/${site}`)
      .then((res) => {
        // console.log(site);
        // console.log(res.data[0]);
        // console.log(res.data[0].latitudeDegSite);
        setAffSite(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const position = [latitudeDegSite, longitudeDegSite];

  return (
    <div>
      <Navigation />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", display: "inline-flex" }}>
          <div className="container mt-5">
            <Row>
              <h2 className="mb-4 mt-5">{affSite.nameSite}</h2>
            </Row>

            <Row>
              <div className="col-12 col-sm-12 col-md-12 mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/storage/uploads/sites/${affSite.pictureSite}`}
                    style={{
                      maxHeight: "500px",
                      maxWidth: "100%",
                      display: "block",
                      margin: "0 auto",
                      width: "auto",
                      height: "100%",
                    }}
                    alt={affSite.pictureSite}
                  />

                  <Card.Body className="cardbody">
                    <Card.Title className="cardtitle">
                      {affSite.nameSite}
                    </Card.Title>
                    <Card.Text className="cardtexte">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: affSite.descriptionSit,
                        }}
                      />
                    </Card.Text>
                    <Card.Text className="cardsite">
                      <p className="vert">Contact :</p>
                      <Row>
                        <Col x={12} md={6}>
                          <ul>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-house-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                              </svg>
                              <span className="contact">
                                {affSite.addressSite}
                              </span>
                              <br />
                              <span className="contact2">
                                {affSite.zipSite} {affSite.citySite}
                              </span>
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-telephone-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                                />
                              </svg>
                              <span className="contact">
                                {affSite.phoneSite}
                              </span>
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-envelope-at-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                              </svg>
                              <span className="contact">
                                {affSite.emailSite}
                              </span>
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-globe"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                              </svg>
                              <span className="contact">
                                {affSite.websiteSite}
                              </span>
                            </li>
                          </ul>
                        </Col>
                        <Col x={12} md={6}>
                          <Map />
                        </Col>
                      </Row>
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

export default AffSite;
