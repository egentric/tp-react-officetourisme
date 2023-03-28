import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowSite = () => {
  const [showSite, setShowSite] = useState([]);
  useEffect(() => {
    displayShowSite();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowSite = async () => {
    await axios.get("http://localhost:8000/api/sites/${id}").then((res) => {
      setShowSite(res.data.data);
    });
  };
  const deleteShowSite = (id) => {
    axios.delete(`http://localhost:8000/api/sites/${id}`).then(displayShowSite);
  };

  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Email</th>
              <th>Site internet</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Code postal</th>
              <th>Ville</th>
              <th>longitude</th>
              <th>latitude</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showSite.map((site) => (
              <tr key={site.id}>
                <td>{site.nameSite}</td>
                <td>{site.descriptionSite}</td>
                <td>{site.emailSite}</td>
                <td>{site.websiteSite}</td>
                <td>{site.phoneSite}</td>
                <td>{site.addressSite}</td>
                <td>{site.zipSite}</td>
                <td>{site.citySite}</td>
                <td>{site.longitudeDegSite}</td>
                <td>{site.emailSite}</td>
                <td>{site.latitudeDegSite}</td>
                <td>
                  <img
                    src={`http://localhost:8000/storage/uploads/${site.pictureSite}`}
                    alt={site.pictureSite}
                    width="75px"
                  />
                </td>
                <td>
                  <Link
                    to={`/sites/edit/${site.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteShowSite(site.id);
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

export default ShowSite;
