import React from 'react';
import PropTypes from 'prop-types';
import LocationSelector from './LocationSelector';
import NeighbourhoodInfo from './NeighbourhoodInfo';

const Sidebar = ({
  area,
  filter,
  forceNames,
  isLoading,
  neighbourhood,
  setArea,
  setFilter,
  setNeighbourhood
}) => (
  <section id="sidebar" className="open">
    <div id="sidebar-main">
      <LocationSelector {...{ area, forceNames, setArea }} />
      <NeighbourhoodInfo
        {...{ isLoading, setFilter, filter, setNeighbourhood, neighbourhood }}
      />
    </div>
    <Tab />
  </section>
);

const Tab = () => (
  <a
    id="tab-link"
    href="#"
    onClick={() => {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('tab-arrow').classList.toggle('rotate');
    }}
  >
    <div id="sidebar-tab">
      <div id="tab-arrow">{`<`}</div>
    </div>
  </a>
);

Sidebar.propTypes = {
  area: PropTypes.string.isRequired,
  filter: PropTypes.object.isRequired,
  forceNames: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  neighbourhood: PropTypes.object.isRequired,
  setArea: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setNeighbourhood: PropTypes.func.isRequired
};

export default Sidebar;
