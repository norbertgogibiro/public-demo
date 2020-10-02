import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Dropdown = ({ openerButtonText, children }) => {
	return (
		<div className="dropdown-container">
			<button className="dropdown-opener">
				{openerButtonText}
			</button>

			<div className='dropdown'>
				{children}
			</div>
		</div>
	);
};

Dropdown.propTypes = {
	openerButtonText: PropTypes.string.isRequired
};

export default Dropdown;
