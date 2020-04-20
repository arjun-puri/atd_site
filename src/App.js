import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 

import History from "./components/History";
import Realtime from "./components/Realtime";


import { Button, Typography } from "antd";

const { Title } = Typography;


export default function App() {
  return (
<div> 
<Title class="site-page-title">Anti Theft Device Dashboard</Title>

    <Router>
      <div class="site-page-nav">
        <nav>
                     
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
          <Route path="/history">
            <History />
          </Route>
          <Route path="/realtime">
            <Realtime />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}



// function History() {
//   return <h2>About</h2>;
// }

// function Realtime() {
//   return <h2>Users</h2>;
// }
