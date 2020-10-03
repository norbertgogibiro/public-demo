import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { clickEvents } from '../../../common/globalVariables';

const closerEvents = [...clickEvents, 'keyup'];

const Dropdown = ({ openerButtonText, children }) => {
	const [dropdownOpenState, setDropdownOpenState] = useState(false);
	const dropdownWrapperClasses = ['dropdown-container'];
	const handleDropdownClosing = ({ key, type }) => {
		if (clickEvents.includes(type) || (type === 'keyup' && key === 'Escape')) {
			setDropdownOpenState(false);
			closerEvents.forEach(eventName => document.removeEventListener(eventName, handleDropdownClosing));
		}
	}

	if (dropdownOpenState) {
		dropdownWrapperClasses.push('dropdown-state-open');
	}

	useEffect(() => {
		if (dropdownOpenState) {
			closerEvents.forEach(eventName => document.addEventListener(eventName, handleDropdownClosing));
		}

		return function cleanUp() {
			closerEvents.forEach(eventName => document.removeEventListener(eventName, handleDropdownClosing));
		}
	}, [dropdownOpenState]);

	return (
		<div className={dropdownWrapperClasses.join(' ')}>
			<button
				className="dropdown-opener"
				onClick={() => setDropdownOpenState(!dropdownOpenState)}
			>
				{openerButtonText}
			</button>

			<div className='dropdown'>
				{children}
			</div>
		</div>
	);
};

Dropdown.propTypes = {
	openerButtonText: PropTypes.string.isRequired,
	children: PropTypes.element
};

export default Dropdown;
