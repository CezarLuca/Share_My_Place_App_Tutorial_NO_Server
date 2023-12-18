export class Map {
  constructor(coords) {
    // this.coordinates = coords;
    this.render(coords);
  }
  render(coordinates) {
    if (!google) {
      alert("Cloud not load maps library - please try again later!");
      return;
    }
    const map = new google.maps.Map(document.getElementById("map"), {
      // center: this.coordinates,
      center: coordinates,
      zoom: 16,
    });

    new google.maps.Marker({
      // position: this.coordinates,
      position: coordinates,
      map: map,
    });
  }
}