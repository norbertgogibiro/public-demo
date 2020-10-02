import React from 'react';
import './styles.scss';
import { LinkUrl } from '../../elements';

const Footer = () => (
	<footer>
		<small>
			<p>A website made by <LinkUrl label='norbertgogibiro' href='https://dk.linkedin.com/in/norbert-biro'/> based on <LinkUrl label='Saba Anwar' href='https://fr.linkedin.com/in/sabanoir'/>&apos;s Gazsiafter animation theme design</p>
			<p>Copyright &copy; <span className="current-year"></span> Paperdeer. All Rights Reserved</p>
		</small>
	</footer>
);

export default Footer;
