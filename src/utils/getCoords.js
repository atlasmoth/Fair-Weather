export default function getCoords(navigator) {
  return new Promise((resolve) => {
    const callback = (position) =>
      resolve({
        latitude: position?.coords?.latitude ?? 40.73061,
        longitude: position?.coords?.longitude ?? -73.935242,
      });

    navigator.geolocation.getCurrentPosition(callback, callback);
  });
}
