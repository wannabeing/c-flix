import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Routes/Movies";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/", "movies/:id", "movies/:kind/:id"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
