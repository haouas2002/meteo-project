import React from "react";
import "../styles/Footer.css";

function Footer() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();

  return (
    <div className="footer">
      <p>
        © {year} WeatherMe. All rights reserved. Designed by{" "}
        <a href="#mh">M.H.</a>
      </p>
    </div>
  );
}

export default Footer;  