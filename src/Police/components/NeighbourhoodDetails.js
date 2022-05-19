import React from 'react';
import PropTypes from 'prop-types';
import { webLinkify, mailLinkify } from '../helpers';

const NeighbourhoodDetails = ({ hood }) => {

  const formatContact = contact => {
    let { type, details } = contact;

    if (type === 'twitter') {

      !details.includes('twitter.com') &&
        (details = `https://twitter.com/${details}`);
      details = details.replace('/#!', '');
      details = webLinkify(details);
    } else if (
      (details.includes('.uk') || details.includes('.co')) &&
      !details.includes('@') &&
      !details.includes(' ')
    ) {
      !details.includes('http') && (details = `http://${details}`);
      details = webLinkify(details);
    } else if (details.includes('@') || type === 'email') {
      details = mailLinkify(details);
    }
    return { type, details };
  };

  const contactList = Object.keys(hood.contact).map(key => ({
    type: key,
    details: hood.contact[key]
  }));


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
