import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const LinkUrl = ({ label, href, isEnhanced }) => (
  <a target="_blank" href={href} rel='noreferrer'>
    {label}
    {isEnhanced && <FontAwesomeIcon icon={faStar} />}
  </a>
);

LinkUrl.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isEnhanced: PropTypes.bool,
};

export default LinkUrl;
