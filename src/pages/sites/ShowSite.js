import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowSite = () => {
  const { site } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [showSite, setShowSite] = useState("");

  useEffect(() => {
    displayShowSite();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowSite = async () => {
    await axios
      .get(`http://localhost:8000/api/sites/${site}`)
      .then((res) => {
        // console.log(res.data);
        setShowSite(res.data[0]);
        // console.log(res.data);
        setImage(res.data[0].pictureSite);
        // console.log(setShowSite);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteShowSite = (id) => {
    axios
      .delete(`http://localhost:8000/api/sites/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        navigate("/sites"); // Redirige vers la page d'index après la suppression
      })
      .catch((error) => {
        console.log(error);
      });
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
                  <h4 className="card-title">Site</h4>
                  <hr />
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <th>Nom</th>
                        <td>{showSite.nameSite}</td>
                      </tr>
                      <tr>
                        <th>Type</th>
                        <td>{showSite.nameType}</td>
                      </tr>
                      <tr>
                        <th>Description</th>
                        <td>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: showSite.descriptionSite,
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <th>Email</th>
                        <td>{showSite.emailSite}</td>
                      </tr>
                      <tr>
                        <th>Site Internet</th>
                        <td>{showSite.websiteSite}</td>
                      </tr>
                      <tr>
                        <th>Téléphone</th>
                        <td>{showSite.phoneSite}</td>
                      </tr>
                      <tr>
                        <th>Adresse</th>
                        <td>{showSite.addressSite}</td>
                      </tr>
                      <tr>
                        <th>Code postal</th>
                        <td>{showSite.zipSite}</td>
                      </tr>
                      <tr>
                        <th>Ville</th>
                        <td>{showSite.citySite}</td>
                      </tr>
                      <tr>
                        <th>Nom de l'auteur</th>
                        <td>
                          {showSite.firstName} {showSite.lastName}
                        </td>
                      </tr>
                      <tr>
                        <th>Nom de la Photo</th>
                        <td>{showSite.pictureSite}</td>
                      </tr>
                      <tr>
                        <th>Photo</th>
                        <td>
                          <img
                            src={`http://localhost:8000/storage/uploads/sites/${image}`}
                            alt={showSite.pictureSite}
                            width="75px"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Longitude</th>
                        <td>{showSite.longitudeDegSite}</td>
                      </tr>
                      <tr>
                        <th>Latitude</th>
                        <td>{showSite.latitudeDegSite}</td>
                      </tr>

                      <tr>
                        <th>Actions</th>
                        <td>
                          <Button
                            className="btn-1 btn-sm me-2"
                            onClick={() => navigate(-1)}
                          >
                            Retour
                          </Button>

                          <Link
                            to={`/sites/edit/${showSite.id}`}
                            className="btn btn-2 btn-sm me-2"
                          >
                            Edit
                          </Link>

                          <Button
                            className="btn-sm"
                            variant="danger"
                            onClick={() => {
                              deleteShowSite(showSite.id);
                            }}
                          >
                            Supprimer
                          </Button>
                        </td>
                      </tr>
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

export default ShowSite;
