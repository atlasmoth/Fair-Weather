import { Switch, Route, Redirect, Link } from "react-router-dom";
import Home from "./components/home";
import City from "./components/city";
import Search from "./components/search";
import { useState } from "react";

const initialCities = [];
function App() {
  const [favorites, setFavorites] = useState(() => {
    const favesList = localStorage.getItem("favorites");
    const parsedList = favesList ? JSON.parse(favesList) : initialCities;
    return parsedList;
  });

  const updateFavorites = (obj) => {
    let newObjs;

    newObjs = [...favorites, { ...obj }];

    localStorage.setItem("favorites", JSON.stringify(newObjs));
    setFavorites(newObjs);
  };
  const removeFavorites = (obj) => {
    const newObjs = favorites.filter((f) => f.id !== obj.id);
    localStorage.setItem("favorites", JSON.stringify(newObjs));
    setFavorites(newObjs);
  };
  return (
    <main>
      <div className="container">
        <Link to="/">
          <h1 className="blue" style={{ fontSize: "3rem" }}>
            Fair Weather
          </h1>
        </Link>

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
          <Route exact path="/" component={Home} />

          <Route exact component={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
