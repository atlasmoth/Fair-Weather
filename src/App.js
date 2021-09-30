import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import City from "./components/city";
import Search from "./components/search";

function App() {
  return (
    <main>
      <div className="container">
        <h1 className="blue">Fair Weather</h1>
        <Search />
        <Switch>
          <Route exact path="/cities/:city">
            {(props) => {
              return <City {...props} />;
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
