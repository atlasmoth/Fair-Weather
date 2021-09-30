import { useEffect } from "react";
import fetcher from "../utils/fetcher";
import getCoords from "../utils/getCoords";

export default function Home(props) {
  // useEffect(() => {
  //   getCoords(window.navigator)
  //     .then(async ({ latitude, longitude }) => {
  //       const OPEN_CAGE_URL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_GEOCODE}&language=en&pretty=1`;
  //       try {
  //         const {
  //           results: [
  //             {
  //               components: { city, state, country },
  //               geometry: { lat, lng },
  //             },
  //           ],
  //         } = await fetcher(window.fetch, OPEN_CAGE_URL, {});
  //         console.log(city, state, country);
  //         console.log(lat, lng);
  //       } catch (error) {
  //         throw error;
  //       }
  //     })
  //     .catch(console.error);
  // },[]);
  return <h2>Welcome bruh</h2>;
}
