import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./components/Header";
import Movie from "./Routes/Movie";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/c-flix/tv">
          <Tv />
        </Route>
        <Route
          path={[
            "/c-flix/search",
            "/c-flix/search/movie/:id",
            "/c-flix/tv/:id",
          ]}
        >
          <Search />
        </Route>
        <Route path={["/c-flix/", "/c-flix/movie/:id", "/c-flix/tv/:id"]}>
          <Movie />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
