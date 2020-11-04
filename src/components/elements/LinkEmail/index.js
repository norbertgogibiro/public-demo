import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const LinkEmail = ({ user, domain, tld }) => {
	const [finalLink, setFinalLink] = useState('');

	useEffect(() => {
		setFinalLink(`mailto:${user}@${domain}.${tld}`);
	}, []);

	return (
		<a
			href={finalLink}
			className='link-email'
			data-user={user}
			data-domain={domain}
			data-tld={tld}
		/>
	);
}

LinkEmail.propTypes = {
	user: PropTypes.string.isRequired,
	domain: PropTypes.string.isRequired,
	tld: PropTypes.string.isRequired,
};

export default LinkEmail;
