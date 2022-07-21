import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./components/Header";
import Movie from "./Routes/Movie";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="tv">
          <Tv />
        </Route>
        <Route path={["search", "search/movie/:id", "tv/:id"]}>
          <Search />
        </Route>
        <Route path={["", "movie/:id", "tv/:id"]}>
          <Movie />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
