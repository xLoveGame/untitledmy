import React from 'react';
import PropTypes from 'prop-types';

const LocationSelector = ({ forceNames, setArea, area }) => (
  <div id="location-component">
    <h2>Location</h2>
    <select
      value={area}
      onChange={event => setArea(event.target.value)}
    >
      <option disabled value="default">
        Select a region...
      </option>
      {forceNames.map(force => (
        <option key={force} value={force}>
          {force}
        </option>
      ))}
    </select>
  </div>
);

LocationSelector.propTypes = {
  area: PropTypes.string.isRequired,
  forceNames: PropTypes.array.isRequired,
  setArea: PropTypes.func.isRequired
};

export default LocationSelector;
