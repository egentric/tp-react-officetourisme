import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const Map = () => {
  const { type } = useParams();
  const [sites, setSites] = useState([]);
  const [nameSite, setNameSite] = useState("");
  const [latitudeDegSite, setLatitudeDegSite] = useState("");
  const [longitudeDegSite, setLongitudeDegSite] = useState("");

  const mapRef = useRef();

  useEffect(() => {
    displayCarte();
  }, []);

  const displayCarte = async () => {
    await axios
      .get(`http://localhost:8000/api/sites/type/${type}`)
      .then((res) => {
        console.log(res.data);
        // console.log(res.data[0]);
        // console.log(res.data[0].latitudeDegSite);
        setSites(res.data);
        setNameSite(res.data[0].nameSite);
        setLatitudeDegSite(res.data[0].latitudeDegSite);
        setLongitudeDegSite(res.data[0].longitudeDegSite);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div>
      {latitudeDegSite && longitudeDegSite && (
        <MapContainer
          center={[latitudeDegSite, longitudeDegSite]}
          zoom={12}
          scrollWheelZoom={false}
          ref={mapRef}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sites.map((site) => (
            <Marker position={[site.latitudeDegSite, site.longitudeDegSite]}>
              <Popup>{site.nameSite}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
