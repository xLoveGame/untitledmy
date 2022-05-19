import React, { Component } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import { getForces, getNeighbourhoods } from './api/PoliceAPI';
import './css/App.css';

export default class PolicePoint extends Component {
  state = {
    area: '',
    filter: { query: '', neighbourhoods: [] },
    forces: [{ id: '', name: '' }],
    isLoading: true,
    neighbourhood: {},
    neighbourhoods: []
  };


  setFilter = query => {
    const lowerQuery = query.toLowerCase();
    const filteredHoods = this.state.neighbourhoods.filter(hood =>
      hood.name.toLowerCase().includes(lowerQuery)
    );

    this.setState({ filter: { query, neighbourhoods: filteredHoods } }, () =>
      this.verifySelectedHoodInList()
    );
  };

  verifySelectedHoodInList = () => {
    const { filter, neighbourhood } = this.state;
    !filter.neighbourhoods.includes(neighbourhood) &&
      this.setState({ neighbourhood: {} });
  };


  setArea = area => {
    this.setState({ area, isLoading: true });
    const areaId = this.state.forces.find(force => force.name === area).id;
    getNeighbourhoods(areaId).then(neighbourhoods =>
      this.setState({
        filter: { query: '', neighbourhoods },
        isLoading: false,
        neighbourhood: {},
        neighbourhoods
      })
    );
  };

  setNeighbourhood = neighbourhood => this.setState({ neighbourhood });

  componentDidMount() {
    getForces()
      .then(forces => this.setState({ forces }))
      .then(() => this.setArea('Hampshire'));
  }

  render() {
    return (
      <div className="App">
         {/*<Header /> */}
        <main>
          <Sidebar
            area={this.state.area}
            isLoading={this.state.isLoading}
            filter={this.state.filter}
            forceNames={this.state.forces.map(force => force.name)}
            neighbourhood={this.state.neighbourhood}
            setArea={this.setArea}
            setFilter={this.setFilter}
            setNeighbourhood={this.setNeighbourhood}
          />
          <Map
            availableNeighbourhoods={this.state.neighbourhoods.length}
            filter={this.state.filter}
            neighbourhood={this.state.neighbourhood}
            setNeighbourhood={this.setNeighbourhood}
          />
        </main>
      </div>
    );
  }
}
