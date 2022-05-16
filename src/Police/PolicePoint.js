import React, { Component } from 'react';
import Header from './components/Header';
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

  //Update filterQuery and filteredNeighbourhoods based on filterQuery
  setFilter = query => {
    const lowerQuery = query.toLowerCase();
    const filteredHoods = this.state.neighbourhoods.filter(hood =>
      hood.name.toLowerCase().includes(lowerQuery)
    );

    this.setState({ filter: { query, neighbourhoods: filteredHoods } }, () =>
      this.verifySelectedHoodInList()
    );
  };

  //Deselect current neighbourhood if it's not in filtered neighbourhoods
  //This means a selected neighbourhood can never be "hidden" from the user
  verifySelectedHoodInList = () => {
    const { filter, neighbourhood } = this.state;
    !filter.neighbourhoods.includes(neighbourhood) &&
      this.setState({ neighbourhood: {} });
  };

  //Sets current area and resets any state relating to a previous area
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
      //This line hard codes in the default area to load when the app is
      //initialised.  It can be removed to give the user a chance to select
      //which area they want to browse initially.  The reason it is included
      //is because the app spec explicitly says that there must be pins
      //rendered on the map when the app is first loaded.  "Leicestershire"
      //was chosen because it has a fast load time, and a good range of data.
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
