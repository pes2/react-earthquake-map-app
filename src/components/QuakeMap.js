import React, { useEffect, useState } from "react";
import { divIcon } from "leaflet";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  GeoJSON,
  LayerGroup
} from "react-leaflet";
import PropTypes from "prop-types";
import boundariesJson from "./services/PB2002_boundaries.json";
import moment from "moment";
import LegendControl from "./LegendControl";
import Control from "react-leaflet-control";

const { Overlay } = LayersControl;

const QuakeMap = props => {
  const [location, setLocation] = useState({ lat: 47.3, lng: -2.6 });
  const [zoom, setZoom] = useState(2);
  const [quakes, setQuakes] = useState(null);
  const [haveQuakeLocation, setHaveQuakeLocation] = useState(false);

  useEffect(() => {
    setHaveQuakeLocation(true);
    setQuakes(props.quakes);
  });

  const toDateTime = secs => {
    return moment(secs).format("MMMM Do YYYY, hh:mm:ss");
  };

  const position = [location.lat, location.lng];

  const markerHtmlStyles = myColor => {
    return `
    background-color: ${myColor};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;
  };

  const icon = style => {
    return divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="${style}" />`
    });
  };

  const setIcon = magnitude => {
    const colorCode = getColor(magnitude);
    const style = markerHtmlStyles(colorCode);
    return icon(style);
  };

  const getColor = d => {
    return d > 10
      ? "#8C3933"
      : d > 9
      ? "#B84B22"
      : d > 8
      ? "#E5927F"
      : d > 7
      ? "#DE9C2B"
      : d > 6
      ? "#E88EEA"
      : d > 5
      ? "#83B119"
      : d > 4
      ? "#526777"
      : d > 3
      ? "#3F61A1"
      : d > 2
      ? "#6DA3DC"
      : d > 1
      ? "#A7D5FF"
      : "#A7D5FF";
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onFilter(event);
  };

  return (
    <div className="App">
      <Map
        className="map"
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <LayersControl>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <Overlay name="Fault lines">
            <LayerGroup>
              <GeoJSON data={boundariesJson} style={faultLineStyle} />
            </LayerGroup>
          </Overlay>

          <Control position="topleft">
            <div className="info">
              <form onSubmit={handleSubmit} className="form2">
                <label className="filter-column2">Minimum Magnitude</label>
                <br />
                <select name="magnitude">
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                <br />
                <label className="filter-column2">Date Range:</label>
                <br />
                <input type="date" name="min" />
                <br />
                <input type="date" name="max" />
                <br />
                <input type="submit" className="btn btn-primary" />
              </form>
            </div>
          </Control>

          <LegendControl />

          {haveQuakeLocation
            ? quakes.map((element, index) => (
                <Marker
                  key={index}
                  position={[
                    element.geometry.coordinates[1],
                    element.geometry.coordinates[0]
                  ]}
                  icon={setIcon(element.properties.mag)}
                >
                  <Popup>
                    <p>Magnitude: {element.properties.mag}</p>
                    <p>Location: {element.properties.place}</p>
                    <p>Time: {toDateTime(element.properties.time)}</p>
                    <a
                      href={element.properties.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More info
                    </a>
                  </Popup>
                </Marker>
              ))
            : ""}
        </LayersControl>
      </Map>
    </div>
  );
};

const faultLineStyle = {
  color: "#FF5733",
  weight: 5,
  opacity: 0.65
};

QuakeMap.propTypes = {
  quakes: PropTypes.array.isRequired
};

export default QuakeMap;
