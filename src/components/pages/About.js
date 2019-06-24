import React, { Fragment } from "react";

const About = () => {
  console.log("About");
  return (
    <Fragment>
      <div className="container container-text">
        <h1>About</h1>
        <p>
          Page about earthquake information. User can filter earthquakes based
          on minimum magnitude, start and end dates. Earthquake information is
          from the USGS API.
        </p>
        <br />
        <p>Version: 1.0.0</p>
      </div>
    </Fragment>
  );
};

export default About;
