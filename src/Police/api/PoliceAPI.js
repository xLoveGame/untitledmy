import {
  alphabetiseArray,
  cleanAreaNames,
  cleanNeighbourhoodNames
} from '../helpers';

export const getForces = () =>
  fetch(`/api/forces`)
    .then(res => res.json())
    .then(results => cleanAreaNames(results));

export const getNeighbourhoods = area => {
  let neighbourhoodIds = [];


  const setNeighbourhoodIds = area =>
    fetch(`/api/${area}/neighbourhoods`)
      .then(res => res.json())
      .then(res => res.map(hood => hood.id))
      .then(hoodIds => (neighbourhoodIds = hoodIds));

  const getNeighbourhoodData = () =>
    Promise.all(neighbourhoodIds.slice(0, 10).map(async  (id, index)=> await fetch(`/api/${area}/${id}`), 18000))
      .then(res => Promise.all(res.map(hood => hood.json())))
      .then(hoods =>
        hoods.map(hood => ({
          id: hood.id,
          name: cleanNeighbourhoodNames(hood.name),
          location: {
            lat: parseFloat(hood.centre.latitude),
            lng: parseFloat(hood.centre.longitude)
          },
          website: hood.url_force,
          contact: hood.contact_details
        }))
      );

  return setNeighbourhoodIds(area)
    .then(() => getNeighbourhoodData())
    .then(neighbourhoods => alphabetiseArray(neighbourhoods, 'name'));
};
