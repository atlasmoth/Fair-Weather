import { Switch, Route, Redirect, Link, useHistory } from "react-router-dom";
import Home from "./components/home";
import City from "./components/city";
import Search from "./components/search";
import { useState, useCallback } from "react";
import helper from "./utils/helper";
import getCoords from "./utils/getCoords";
import fetcher from "./utils/fetcher";

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
    const parsedList = favesList ? JSON.parse(favesList) : [];
    return parsedList;
  });

  const refresh = (names) => {
    console.log("this has run");
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
        localStorage.setItem("favorites", JSON.stringify(sorted));
        setFavorites(sorted);
      })
      .catch(console.log);
  };
  const updateFavorites = (obj) => {
    let newObjs;

    newObjs = helper([...favorites, { ...obj }]);
    const names = newObjs.map((n) => n.name);
    refresh(names);
  };
  const removeFavorites = (obj) => {
    const newObjs = favorites.filter((f) => f.id !== obj.id);
    const names = newObjs.map((n) => n.name);
    refresh(names);
  };
  return (
    <main>
      <div className="container">
        <div className="split">
          <Link to="/">
            <h1 className="blue" style={{ fontSize: "2rem" }}>
              Fair Weather
            </h1>
          </Link>
          <div className="enlarge point" onClick={() => me()}>
            <i className="fas fa-map-marked-alt red"></i>
          </div>
        </div>

        <Search />
        <Switch>
          <Route exact path="/cities/:city">
            {(props) => {
              return (
                <City
                  {...props}
                  favorites={favorites}
                  updateFavorites={updateFavorites}
                  removeFavorites={removeFavorites}
                />
              );
            }}
          </Route>
          <Route exact path="/">
            {(props) => {
              return (
                <Home
                  {...props}
                  favorites={favorites}
                  removeFavorites={removeFavorites}
                />
              );
            }}
          </Route>

          <Route exact component={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
