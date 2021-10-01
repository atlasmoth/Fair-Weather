import { Link } from "react-router-dom";
import Skycons from "react-skycons";
import { getIcon } from "./../utils/getIcon";

export default function FavoriteCities({ favorites, removeFavorites }) {
  return (
    <div>
      <h2 className="title">Favorites</h2>
      <div className="list">
        {favorites.map((f) => (
          <FavoriteCity city={f} removeFavorites={removeFavorites} key={f.id} />
        ))}
      </div>
    </div>
  );
}

const FavoriteCity = ({ city, removeFavorites }) => {
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
            removeFavorites(city);
          }}
        >
          <i className="fas fa-heart red"></i>
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
