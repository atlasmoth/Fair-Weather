import { useRef } from "react";
import { Link } from "react-router-dom";
import Skycons from "react-skycons";
import { getIcon } from "./../utils/getIcon";
import { refresh } from "../utils/refresh";
import useCities from "../hooks/useCities";
import { useDataContext } from "../contexts/dataContext";

const initialCities = [
  "Tokyo",
  "Delhi",
  "Shanghai",
  "São Paulo",
  "Mexico City",
  "Cairo",
  "Mumbai",
  "Beijing",
  "Dhaka",
  "Osaka",
  "New York",
  "Karachi",
  "Buenos Aires",
  "Chongqing",
  "Istanbul",
];

export default function LargestCities() {
  const dataContext = useDataContext();
  const { largestCities, setLargestCities } = dataContext;

  const names = useRef(
    largestCities.length > 0 ? largestCities.map((c) => c.name) : initialCities
  ).current;
  const key = useRef("largest").current;
  useCities(names, key, setLargestCities);

  return (
    <div>
      <h2 className="title">Largest 🏔️</h2>
      <div className="list">
        {largestCities.map((c) => (
          <LargeCity
            key={c.id}
            city={c}
            removeCity={(obj) => {
              const newObjs = largestCities.filter((f) => f.id !== obj.id);
              refresh(newObjs, key, setLargestCities);
            }}
          />
        ))}
      </div>
    </div>
  );
}

const LargeCity = ({ city, removeCity }) => {
  return (
    <div className="listitem">
      <h3>
        <Link to={`/cities/${encodeURIComponent(city.name)}`}>
          <span className="right-span">
            {city.name}, {city?.sys?.country}
          </span>
        </Link>

        <span
          className="point"
          onClick={() => {
            removeCity(city);
          }}
        >
          <i className="fas fa-times red"></i>
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
        {city.main.temp} <sup>o</sup>C
      </h3>
    </div>
  );
};
