import React from "react";
import styles from "./Footer.module.scss";
import { LinkUrl } from "../../elements";

const Footer = () => (
  <footer className={styles.Footer}>
    <small>
      <p>
        A website made by{" "}
        <LinkUrl
          label="this guy"
          href="https://dk.linkedin.com/in/norbert-biro"
        />{" "}
        based on <LinkUrl label="Saba Anwar" href="https://www.sabaanwar.fr" />
        &apos;s Gazsiafter animation theme design
      </p>
      <p>
        Copyright &copy; <span className="current-year"></span> Paperdeer. All
        Rights Reserved
      </p>
    </small>
  </footer>
);

export default Footer;
