import React from 'react';

/* Exports */

//Sorts an array of objects alphabetically by property
export const alphabetiseArray = (array, property) =>
  array.sort((a, b) => a[property].localeCompare(b[property]));

//Strips unwanted strings from an array of areas' names
//Some areas have prefixes or suffixes that are not necessary.
//These are removed for consistancy.
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

//Strips unwanted strings from a neighbourhood's name
//Some neighbourhoods have suffixes that are not necessary.
//These are removed for consistancy.
export const cleanNeighbourhoodNames = hood => {
  const disallowed = [
    ' (One Team)',
    ' policing team',
    ' Safer Neighbourhood Team',
    ' Community Police Team'
  ];
  return cleanString(hood, disallowed);
};

//Returns a mailto link form an email string
export const mailLinkify = email => <a href={`mailto:${email}`}>{email}</a>;

//Retruns a HTML link from a url string
export const webLinkify = url => (
  <a href={url} target="_blank">
    {url}
  </a>
);

/* Internal */

//Strips array of strings from string and converts "and" to "&"
const cleanString = (string, disallowed) => {
  disallowed.forEach(element => (string = string.replace(element, '')));
  return convertToAmpersand(string);
};

// Replaces "&amp;" and "and" with "&"
const convertToAmpersand = string =>
  string.replace(/&amp;/g, '&').replace(/ and /g, ' & ');
