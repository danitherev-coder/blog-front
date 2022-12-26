import React from "react";
import Logo from "../img/dani1.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" style={{width: "100px", height: "100px"}}/>
      <span>
        Made with ♥️ by <b>Carlos Daniel</b>.
      </span>
    </footer>
  );
};

export default Footer;
