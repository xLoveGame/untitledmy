import React from 'react';
import ReactDOM from 'react-dom';
import PolicePoint from './PolicePoint';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PolicePoint />, div);
  ReactDOM.unmountComponentAtNode(div);
});
