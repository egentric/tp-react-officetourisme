import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ShowEvent = () => {
  const { event } = useParams();
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [image, setImage] = useState("");
  const [showEvent, setShowEvent] = useState("");
  useEffect(() => {
    displayShowEvent();
  }, []);
  // Sans les crochets ça tourne en boucle

  // console.log(sites);
  const displayShowEvent = async () => {
    await axios
      .get(`http://localhost:8000/api/events/${event}`)
      .then((res) => {
        setShowEvent(res.data);
        setSites(res.data.site);
        setImage(res.data.pictureEvent);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteShowEvent = (id) => {
    axios
      .delete(`http://localhost:8000/api/events/${id}`)
      .then(displayShowEvent);
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
                  <h4 className="card-title">Evénement</h4>
                  <hr />
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <th>Titre</th>
                        <td>{showEvent.titleEvent}</td>
                      </tr>
                      <tr>
                        <th>SousTitre</th>
                        <td>{showEvent.subtitleEvent}</td>
                      </tr>
                      <tr>
                        <th>Contenu</th>
                        <td>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: showEvent.contentEvent,
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Site</th>
                        <td>
                          {/* {showEvent.site.nameSite} */}
                          <ul>
                            {sites &&
                              sites.map((site) => (
                                <li key={site.id}>{site.nameSite}</li>
                              ))}
                          </ul>
                        </td>
                      </tr>

                      <tr>
                        <th>Nom de la Photo</th>
                        <td>{showEvent.pictureEvent}</td>
                      </tr>
                      <tr>
                        <th>Photo</th>
                        <td>
                          <img
                            src={`http://localhost:8000/storage/uploads/events/${image}`}
                            alt={showEvent.pictureEvent}
                            width="75px"
                          />
                        </td>
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
                            to={`/events/edit/${showEvent.id}`}
                            className="btn btn-2 btn-sm me-2"
                          >
                            Modifier
                          </Link>
                          <Button
                            className="btn-sm"
                            variant="danger"
                            onClick={() => {
                              deleteShowEvent(showEvent.id);
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

export default ShowEvent;
