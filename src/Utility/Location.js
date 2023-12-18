const GOOGLE_API_KEY = "PLACEHOLDER";

export async function getAdressFromCoords(coords) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch adress. Please try again!"); // Error is a built-in constructor function in JS
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  // console.log(data);
  const adress = data.results[0].formatted_address;
  return adress;
}

export async function getCoordsFromAdress(adress) {
  const urlAdress = encodeURI(adress);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAdress}&key=${GOOGLE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates. Please try again!");
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  // console.log(data);
  const coordinates = data.results[0].geometry.location;
  return coordinates;
}
