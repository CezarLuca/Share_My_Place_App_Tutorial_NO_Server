import { Map } from "./UI/Map";

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitleEl = document.querySelector("header h1");
    headerTitleEl.textContent = address;
  }
}

const url = new URL(location.href); // URL is a built-in constructor function in JS
const queryParams = url.searchParams; // searchParams is a built-in property in JS
const coordinates = {
  lat: parseFloat(queryParams.get("lat")),
  lng: +queryParams.get("lng"), // + is a shortcut for parseFloat()
};
const address = queryParams.get("address");

new LoadedPlace(coordinates, address);

window.initMap = function () {
  new Map(coordinates);
  // const loadedPlace = new LoadedPlace(coordinates, address);
  new LoadedPlace(coordinates, address);
};

