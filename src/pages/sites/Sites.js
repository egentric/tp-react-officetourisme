import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const Sites = () => {
  const [sites, setSites] = useState([]);
  useEffect(() => {
    displaySites();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displaySites = async () => {
    await axios.get(`http://localhost:8000/api/sites`).then((res) => {
      setSites(res.data.data);
    });
  };
  const deleteSite = (id) => {
    axios.delete(`http://localhost:8000/api/sites/${id}`).then(displaySites);
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
                  <h4 className="card-title">Sites</h4>
                  <hr />
                  <Link
                    to={`/sites/add`}
                    className="btn btn-2 btn-sm me-2 mb-2"
                  >
                    Nouveau
                  </Link>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Noms</th>
                        <th>Types</th>
                        <th>Emails</th>
                        {/* <th>Sites Internet</th> */}
                        <th>Téléphones</th>
                        {/* <th>Adresses</th> */}
                        {/* <th>Codes postaux</th> */}
                        {/* <th>Villes</th> */}
                        {/* <th>Longitudes</th> */}
                        {/* <th>Latitudes</th> */}
                        {/* <th>Photos</th> */}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sites.map((site) => (
                        <tr key={site.id}>
                          <td>{site.nameSite}</td>
                          <td>{site.type.nameType}</td>
                          <td>{site.emailSite}</td>
                          {/* <td>{site.websiteSite}</td> */}
                          <td>{site.phoneSite}</td>
                          {/* <td>{site.addressSite}</td> */}
                          {/* <td>{site.zipSite}</td> */}
                          {/* <td>{site.citySite}</td> */}
                          {/* <td>{site.longitudeDegSite}</td> */}
                          {/* <td>{site.latitudeDegSite}</td> */}
                          {/* <td>{site.pictureSite}</td> */}
                          {/* <td>
                            <img
                              src={`http://localhost:8000/storage/uploads/${site.pictureSite}`}
                              alt={site.pictureSite}
                              width="75px"
                            />
                          </td> */}
                          <td>
                            <Link
                              to={`/sites/show/${site.id}`}
                              className="btn btn-2 btn-sm me-2"
                            >
                              Voir
                            </Link>
                            <Link
                              to={`/sites/edit/${site.id}`}
                              className="btn btn-1 btn-sm me-2"
                            >
                              Edit
                            </Link>
                            <Button
                              className="btn-sm"
                              variant="danger"
                              onClick={() => {
                                deleteSite(site.id);
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
export default Sites;
