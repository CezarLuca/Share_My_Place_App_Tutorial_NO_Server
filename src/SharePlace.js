import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAdress, getAdressFromCoords } from "./Utility/Location";
class Coordinates {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}

class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    adressForm.addEventListener("submit", this.findAdressHandler.bind(this));
  }

  sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById("share-link");
    if (!navigator.clipboard) {
      alert("Please copy manually!");
      sharedLinkInputElement.select();
      return;
    }
    navigator.clipboard
      .writeText(sharedLinkInputElement.value)
      .then(() => {
        alert("Copied into clipboard!");
      })
      .catch((err) => {
        console.log(err);
        sharedLinkInputElement.select();
      });
  }

  selectPlace(coordinates, adress) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    const sharedLinkInputElement = document.getElementById("share-link");
    sharedLinkInputElement.value = `${
      location.origin
    }/my-place?address=${encodeURI(adress)}&lat=${coordinates.lat}&lng=${
      coordinates.lng
    }`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature is not available in your browser - please use a more modern browser or manually enter an address."
      );
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        console.log(successResult);
        // const coordinates = {
        //   lat: successResult.coords.latitude,
        //   lng: successResult.coords.longitude,
        // };
        const coordinates = new Coordinates(
          successResult.coords.latitude,
          successResult.coords.longitude
        );
        // console.log(coordinates);
        const adress = await getAdressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, adress);
      },
      (error) => {
        modal.hide();
        alert(
          "Could not locate you unfortunately. Please enter an address manually!"
        );
      }
    );
  }

  async findAdressHandler(event) {
    event.preventDefault();
    const adress = event.target.querySelector("input").value;
    if (!adress || adress.trim().length === 0) {
      alert("Invalid adress entered - please try again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAdress(adress);
      this.selectPlace(coordinates, adress);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();

window.initMap = function () {
  // new Map();
  // const placeFinder = new PlaceFinder();
};
// initMap();
