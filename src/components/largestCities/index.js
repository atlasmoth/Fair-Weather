import { Link } from "react-router-dom";
import Skycons from "react-skycons";
import { getIcon } from "./../../utils/getIcon";
import { useDataContext } from "./../../contexts/dataContext";

export default function LargestCities() {
  const dataContext = useDataContext();
  const { largestCities, removeLargeCity } = dataContext;

  return (
    <div>
      <h2 className="title">Largest 🏔️ </h2>
      <div className="list">
        {largestCities.map((c) => (
          <LargeCity
            key={c.id}
            city={c}
            removeCity={() => removeLargeCity(c)}
          />
        ))}
      </div>
    </div>
  );
}

export const LargeCity = ({ city, removeCity }) => {
  {
    /* test this */
  }
  return (
    <div className="listitem">
      <h3>
        <Link to={`/cities/${encodeURIComponent(city.name)}`}>
          <span className="right-span">
            {city.name}, {city?.sys?.country}
          </span>
        </Link>

        <span
          className="point cancel"
          onClick={() => {
            removeCity();
          }}
        >
          ❌
        </span>
      </h3>
      <Skycons
        color="#091f2f"
        type={getIcon(city.weather[0].id)}
        animate={true}
        size={100}
        resizeClear={true}
        className="transparent"
      />

      <h3 className="capital">{city.weather[0].description}</h3>
      <h3>
        🌡️ {city.main.temp} <sup>o</sup>C
      </h3>
    </div>
  );
};
