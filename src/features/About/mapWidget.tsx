import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

export function createMapWidget(containerDomNode: HTMLElement) {
  const map = L.map(containerDomNode);
  map.setView([41.292, 12.573], 6);
  L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
}

export function addPopupToMapWidget(map: L.Map) {
  const popupDiv = document.createElement("div");
  L.popup().setLatLng([41.9027, 12.4963]).setContent(popupDiv).openOn(map);

  return popupDiv;
}
