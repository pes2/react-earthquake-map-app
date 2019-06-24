import L from "leaflet";
import { MapControl } from "react-leaflet";

class LegendControl extends MapControl {
  createLeafletElement(opst) {
    function getColor(d) {
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
    }

    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function(map) {
      let div = L.DomUtil.create("div", "info legend");
      let labels = ["<b>Magnitude</b>"];
      let categories = [
        "0-1",
        "1-2",
        "2-3",
        "3-4",
        "4-5",
        "5-6",
        "6-7",
        "7-8",
        "8-9",
        "9+"
      ];

      const magValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      for (let i = 0; i < categories.length; i++) {
        div.innerHTML += labels.push(
          '<i style="background:' +
            getColor(magValues[i]) +
            '"></i> ' +
            (categories[i] ? categories[i] : "+")
        );
      }
      //console.log(labels);
      div.innerHTML = labels.join("<br>");
      return div;
    };

    return legend;
  }
}

export default LegendControl;
