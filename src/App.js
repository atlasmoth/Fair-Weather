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
  const [favorites, setFavorites] = useState(() => {
    const favesList = localStorage.getItem("favorites");
    return favesList ? JSON.parse(favesList) : [];
  });
  const [largestCities, setLargestCities] = useState(() => {
    const tempLargest = localStorage.getItem("largest");
    return tempLargest ? JSON.parse(tempLargest) : [];
  });
  const names = useRef(favorites.map((f) => f.name)).current;
  const key = useRef("favorites").current;
  const updateFavorites = (obj) => {
    const newObjs = [...favorites, { ...obj }];
    refresh(newObjs, key, setFavorites);
  };
  const removeFavorites = (obj) => {
    const newObjs = favorites.filter((f) => f.id !== obj.id);
    refresh(newObjs, key, setFavorites);
  };
  useCities(names, key, setFavorites);
  return (
    <dataContext.Provider
      value={{
        favorites,
        updateFavorites,
        removeFavorites,
        largestCities,
        setLargestCities,
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
