import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skycons from "react-skycons";
import { getIcon } from "./../utils/getIcon";
import { refresh } from "../utils/refresh";
import useCities from "../hooks/useCities";

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
export default function LargestCities(props) {
  const [cities, setCities] = useState(() => {
    const tempLargest = localStorage.getItem("largest");
    return tempLargest ? JSON.parse(tempLargest) : null;
  });

  const names = useRef(
    cities ? cities.map((c) => c.name) : initialCities
  ).current;
  const key = useRef("largest").current;
  useCities(names, key, setCities);

  return (
    <div>
      <h2 className="title">Largest</h2>
      <div className="list">
        {cities &&
          cities.map((c) => (
            <LargeCity
              key={c.id}
              city={c}
              removeCity={(obj) => {
                const newObjs = cities.filter((f) => f.id !== obj.id);
                refresh(newObjs, key, setCities);
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
          <span style={{ marginRight: "2rem" }}>
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
        style={{ backgroundColor: "transparent" }}
      />

      <h3 style={{ textTransform: "capitalize" }}>
        {city.weather[0].description}
      </h3>
      <h3>
        {city.main.temp} <sup>o</sup>C
      </h3>
    </div>
  );
};
