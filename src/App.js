import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import History from "./components/History";
import Realtime from "./components/Realtime";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";

import { Button, Typography } from "antd";

const { Title } = Typography;

export default function App() {
  // document.title = "ATD";
  return (
    <div>
      <Title class="site-page-title">Anti Theft Device Dashboard</Title>

      <Router>
        <div class="site-page-nav">
          <nav>
            <Link to="/">
              <Button>Home</Button>
            </Link>

            <Link to="/history">
              <Button>History</Button>
            </Link>

            <Link to="/realtime">
              <Button>Realtime</Button>
            </Link>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/history" exact component={History} />

            <Route path="/realtime" exact component={Realtime} />

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

// function NoMatch() {
//   return <h2>Error 404: Not found!</h2>
// }

// function History() {
//   return <h2>About</h2>;
// }

// function Realtime() {
//   return <h2>Users</h2>;
// }
