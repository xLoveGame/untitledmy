import React from 'react';
import PropTypes from 'prop-types';
import { webLinkify, mailLinkify } from '../helpers';

const NeighbourhoodDetails = ({ hood }) => {
  //If possible, formats contact details as a link.
  //Some of the data provided from the Police API is broken/wrong.
  //In these cases, this function tries to manipulate the data as much
  //as possible to show sensible results.
  //The method is a bit messy as it has to handle a lot of data
  //inconsistancies from the Police API - ideally the data would be more
  //consistant so this function could be simplified, and not have the
  //responsibility of data cleaning.
  const formatContact = contact => {
    let { type, details } = contact;
    //Handle twitter
    if (type === 'twitter') {
      //Ensure details is the full twitter URL and not just the twitter handle
      !details.includes('twitter.com') &&
        (details = `https://twitter.com/${details}`);
      //Replace '/#!' in url to make Surrey police twitter links work properly
      details = details.replace('/#!', '');
      details = webLinkify(details);
      //Handle other web link (facebook, flickr, youtube, etc)
    } else if (
      (details.includes('.uk') || details.includes('.co')) &&
      !details.includes('@') &&
      !details.includes(' ')
    ) {
      //Ensure details is prefixed with "http://" if "http/s" not present
      !details.includes('http') && (details = `http://${details}`);
      details = webLinkify(details);
      //Handle email
    } else if (details.includes('@') || type === 'email') {
      details = mailLinkify(details);
    }
    return { type, details };
  };

  //Creates an array of contact objects for the neighbourhood
  const contactList = Object.keys(hood.contact).map(key => ({
    type: key,
    details: hood.contact[key]
  }));

  //Sometimes a websites is defined in both website and contact.website.
  //This statement adds the hood.website to the contact list only if there
  //is not a pre-existing website in contacts.
  if (hood.website && !hood.contact.website) {
    contactList.push({ type: 'website', details: hood.website });
  }

  return (
    <div className="contact-details">
      <h3>{hood.name}</h3>
      <ul>
        {contactList.map(contact => formatContact(contact)).map(contact => (
          <li key={contact.type}>
            <span>{contact.type}:</span> {contact.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

NeighbourhoodDetails.propTypes = {
  hood: PropTypes.object.isRequired
};

export default NeighbourhoodDetails;
