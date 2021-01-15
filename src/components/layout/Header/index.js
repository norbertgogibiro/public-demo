import React from 'react';
import './styles.scss';
import { LinkUrl, LinkEmail, Dropdown, SiteLogo } from '../../elements';

const navMenuItems = {
	Music: [
		{ label: 'Tidal', href: 'https://tidal.com/browse/artist/5352971', isEnhanced: true },
    { label: 'Apple Music', href: 'https://itunes.apple.com/us/artist/paperdeer/795131316', isEnhanced: true},
		{ label: 'Deezer', href: 'https://www.deezer.com/en/artist/5468085' },
		{ label: 'Amazon Music', href: 'https://www.amazon.com/s?k:Paperdeer&i:digital-music&dc&ref:a9_asc_1' },
		{ label: 'Spotify', href: 'https://open.spotify.com/artist/2dvKZH9pulH1g2m26HkoIx' },
		{ label: 'Youtube Music', href: 'https://music.youtube.com/channel/UCI-cVxCzSggq8Yk-9s-oEKQ' },
		{ label: 'Soundcloud', href: 'https://soundcloud.com/paperdeer' }
	],
	News: [
		{ label: 'Facebook', href: 'https://www.facebook.com/paperdeermusic' },
	],
	Videos: [
		{ label: 'Youtube', href: 'https://www.youtube.com/user/PaperDeerOFFICIAL' },
	],
	Pictures: [
		{ label: 'Instagram', href: 'https://www.instagram.com/paperdeermusic' },
	],
	Concerts: [
		{ label: 'Songkick', href: 'https://www.songkick.com/artists/8414153-paperdeer' },
	],
	Support: [
		{ label: 'Patreon', href: 'https://www.patreon.com/paperdeermusic' },
		{ label: 'Bandcamp', href: 'https://paperdeer.bandcamp.com' },
	],
	Contact: {
		Band: <LinkEmail user='management' domain='paperdeermusic' tld='co.uk' />,
		Webmaster: <LinkEmail user='website' domain='paperdeermusic' tld='co.uk' />
	}
};

const Header = () => (
	<header>
		<SiteLogo />

		<nav>
			<ul className="nav-list">
				{Object.entries(navMenuItems).map(({ 0: menuItemGroup, 1: menuDropdownContent }) => (
					<li key={menuItemGroup}>
						<Dropdown openerButtonText={menuItemGroup}>
							{Array.isArray(menuDropdownContent)
								? (
									<ul>
										{menuDropdownContent.map(dropdownLinkData => {
											const { label } = dropdownLinkData;

											return (
												<li key={label}>
													<LinkUrl {...dropdownLinkData} />
												</li>
											);
										})}
									</ul>
								)
								: (
									<dl>
										{Object.entries(menuDropdownContent).map(({ 0: dropdownLinkTerm, 1: dropdownLink }) => (
											<React.Fragment key={dropdownLinkTerm}>
												<dt>{dropdownLinkTerm}</dt>
												<dd>{dropdownLink}</dd>
											</React.Fragment>
										))}
									</dl>
								)
							}
						</Dropdown>
					</li>
				))}
			</ul>
		</nav>
	</header >
);

export default Header;
