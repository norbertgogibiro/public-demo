import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const LinkUrl = ({ label, href }) => <a target="_blank" href={href} rel='noreferrer'>{label}</a>;

LinkUrl.propTypes = {
	label: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
};

export default LinkUrl;
