import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Map from "./components/QuakeMap";
import axios from "axios";
import "./App.css";

const App = () => {
  const [quakes, setQuakes] = useState([]);

  useEffect(() => {
    console.log("useEffect()");
    fetchQuakes();
  }, []);

  const fetchQuakes = async e => {
    let currentDay = new Date();
    let previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    const res = await axios.get(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${previousMonth.toDateString()}&endtime=${currentDay.toDateString()}&minmagnitude=5`
    );
    //console.log(res.data);
    setQuakes(res.data.features);
  };

  const onFilter = async event => {
    const magnitude = event.target.magnitude.value;
    const minDate = event.target.min.value;
    const maxDate = event.target.max.value;

    const res = await axios.get(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${minDate}&endtime=${maxDate}&minmagnitude=${magnitude}`
    );

    //console.log(res.data);
    setQuakes(res.data.features);
  };

  console.log("Render");
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Map quakes={quakes} onFilter={onFilter} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
