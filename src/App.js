import { Switch, Route, Redirect, Link, useHistory } from "react-router-dom";
import Home from "./components/home";
import City from "./components/city";
import Search from "./components/search";
import { useState, useCallback, useRef } from "react";
import getCoords from "./utils/getCoords";
import fetcher from "./utils/fetcher";
import { refresh } from "./utils/refresh";
import useCities from "./hooks/useCities";
import { dataContext } from "./contexts/dataContext";
import { fetchFromLocal, sort } from "./utils/helper";
import initialCities from "./initialCities";

function App() {
  const history = useHistory();
  const me = useCallback(() => {
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
  const [favorites, setFavorites] = useState(fetchFromLocal("favorites"));
  const [largestCities, setLargestCities] = useState(
    JSON.parse(
      localStorage.getItem("largest") ?? JSON.stringify(sort(initialCities))
    )
  );

  const favoritesKey = useRef("favorites").current;
  const largestKey = useRef("largest").current;

  const updateFavorites = (obj) => {
    refresh([...favorites, { ...obj }], favoritesKey, setFavorites);
  };
  const removeFavorites = (obj) => {
    refresh(
      [...favorites.filter((f) => f.id !== obj.id)],
      favoritesKey,
      setFavorites
    );
  };
  const removeLargeCity = (obj) => {
    refresh(
      [...largestCities.filter((f) => f.id !== obj.id)],
      largestKey,
      setLargestCities
    );
  };
  const favoritesRef = useRef(favorites).current;
  const largestRef = useRef(largestCities).current;

  useCities(favoritesRef, favoritesKey, setFavorites);
  useCities(largestRef, largestKey, setLargestCities);
  return (
    <dataContext.Provider
      value={{
        favorites,
        updateFavorites,
        removeFavorites,
        largestCities,
        setLargestCities,
        removeLargeCity,
      }}
    >
      <main>
        <div className="container">
          <div className="split">
            <Link to="/">
              <h1 className="title">🌪️ Fair Weather</h1>
            </Link>
            <div className="enlarge point" onClick={() => me()}>
              <i className="fas fa-map-marked-alt red"></i>
            </div>
          </div>

          <Search />
          <Switch>
            <Route exact path="/cities/:city" component={City} />

            <Route exact path="/" component={Home} />

            <Route exact component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </main>
    </dataContext.Provider>
  );
}

export default App;
