import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const Map = () => {
  const { site } = useParams();
  const [nameSite, setNameSite] = useState("");
  const [latitudeDegSite, setLatitudeDegSite] = useState("");
  const [longitudeDegSite, setLongitudeDegSite] = useState("");

  const mapRef = useRef();

  useEffect(() => {
    displayCarte();
  }, []);

  const displayCarte = async () => {
    await axios
      .get(`http://localhost:8000/api/sites/${site}`)
      .then((res) => {
        // console.log(site);
        // console.log(res.data[0]);
        // console.log(res.data[0].latitudeDegSite);
        setNameSite(res.data[0].nameSite);
        setLatitudeDegSite(res.data[0].latitudeDegSite);
        setLongitudeDegSite(res.data[0].longitudeDegSite);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const position = [latitudeDegSite, longitudeDegSite];

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div>
      {latitudeDegSite && longitudeDegSite && (
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          ref={mapRef}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{nameSite}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
