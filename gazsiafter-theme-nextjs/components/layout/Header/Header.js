import React, { useContext } from "react";
import classNames from "classnames";
import { AppContext } from "../../misc";
import { LinkUrl, Dropdown, SiteLogo } from "../../elements";
import styles from "./Header.module.scss";
import { navMenuItems } from "./Header.utils";

const Header = () => {
  const { themeClassName } = useContext(AppContext);
  return (
    <header className={classNames(styles.Header, styles[themeClassName])}>
      <SiteLogo />

      <nav>
        <ul className={styles.navList}>
          {Object.entries(navMenuItems).map(
            ({ 0: menuItemGroup, 1: menuDropdownContent }) => (
              <li key={menuItemGroup}>
                <Dropdown openerButtonText={menuItemGroup}>
                  {Array.isArray(menuDropdownContent) ? (
                    <ul>
                      {menuDropdownContent.map((dropdownLinkData) => {
                        const { label } = dropdownLinkData;

                        return (
                          <li key={label}>
                            <LinkUrl
                              {...dropdownLinkData}
                              className={styles.linkUrl}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <dl>
                      {Object.entries(menuDropdownContent).map(
                        ({ 0: dropdownLinkTerm, 1: dropdownLink }) => (
                          <React.Fragment key={dropdownLinkTerm}>
                            <dt>{dropdownLinkTerm}</dt>
                            <dd>{dropdownLink}</dd>
                          </React.Fragment>
                        )
                      )}
                    </dl>
                  )}
                </Dropdown>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
