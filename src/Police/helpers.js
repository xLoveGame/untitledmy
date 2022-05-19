import React from 'react';


export const alphabetiseArray = (array, property) =>
  array.sort((a, b) => a[property].localeCompare(b[property]));

export const cleanAreaNames = areas => {
  const disallowed = [
    ' Constabulary',
    ' Police Service',
    ' Police',
    'Police Service of '
  ];
  return areas.map(area => {
    area.name = cleanString(area.name, disallowed);
    return area;
  });
};


export const cleanNeighbourhoodNames = hood => {
  const disallowed = [
    ' (One Team)',
    ' policing team',
    ' Safer Neighbourhood Team',
    ' Community Police Team'
  ];
  return cleanString(hood, disallowed);
};


export const mailLinkify = email => <a href={`mailto:${email}`}>{email}</a>;

export const webLinkify = url => (
  <a href={url} target="_blank">
    {url}
  </a>
);


const cleanString = (string, disallowed) => {
  disallowed.forEach(element => (string = string.replace(element, '')));
  return convertToAmpersand(string);
};

const convertToAmpersand = string =>
  string.replace(/&amp;/g, '&').replace(/ and /g, ' & ');
