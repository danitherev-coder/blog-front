import React from "react";
import Logo from "../img/dani1.png";

const Footer = () => {
  return (
    <footer>
      <img loading="lazy" src={Logo} alt="" style={{width: "100px", height: "100px"}}/>
      <span>
        Made with ♥️ by <b>BEBH</b>.
      </span>
    </footer>
  );
};

export default Footer;
