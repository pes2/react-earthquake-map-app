import React from "react";
import PropTypes from "prop-types";

const FilterQuakes = props => {
  const handleSubmit = event => {
    event.preventDefault();
    props.onFilter(event);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label className="filter-column">Minimum Magnitude</label>
        <br />
        <select name="magnitude">
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        <br />
        <label className="filter-column">Date Range:</label>
        <br />
        <input type="date" name="min" />
        <br />
        <input type="date" name="max" />
        <br />
        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
};

FilterQuakes.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default FilterQuakes;
