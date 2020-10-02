import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const LinkEmail = ({ user, domain, tld }) => (
	<a
		href="#"
		className='link-email'
		data-user={user}
		data-domain={domain}
		data-tld={tld}
	/>
);

LinkEmail.propTypes = {
	user: PropTypes.string.isRequired,
	domain: PropTypes.string.isRequired,
	tld: PropTypes.string.isRequired,
};

export default LinkEmail;
