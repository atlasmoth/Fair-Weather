import { useEffect } from "react";
import fetcher from "../utils/fetcher";
import getCoords from "../utils/getCoords";
import { useHistory } from "react-router-dom";

export default function Home(props) {
  const history = useHistory();

  useEffect(() => {
    getCoords(window.navigator)
      .then(async ({ latitude, longitude }) => {
        const reverseUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER}`;

        try {
          const [{ name }] = await fetcher(window.fetch, reverseUrl, {});
          history.push(`/cities/${name}`);
        } catch (error) {
          throw error;
        }
      })
      .catch(console.error);
  }, [history]);
  return <h2>Welcome bruh</h2>;
}
