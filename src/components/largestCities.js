import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import fetcher from "../utils/fetcher";
import helper from "../utils/helper";
import { Link } from "react-router-dom";
import Skycons from "react-skycons";
import { getIcon } from "./../utils/getIcon";

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
  const updateCities = (names) => {
    Promise.all([
      ...names.map((i) =>
        fetcher(
          window.fetch,
          `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(
            i
          )}&APPID=${process.env.REACT_APP_OPENWEATHER}`,
          {}
        )
      ),
    ])
      .then((data) => {
        const sorted = helper(data);
        localStorage.setItem("largest", JSON.stringify(sorted));
        setCities(sorted);
      })
      .catch(console.log);
  };
  useEffect(() => {
    let names;
    if (!cities) {
      names = initialCities;
    }
    if (cities) {
      names = cities.map((c) => c.name);
    }
    updateCities(names);
    return () => {
      setCities(null);
    };
  }, []);
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
                updateCities(newObjs.map((n) => n.name));
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
