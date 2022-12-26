import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/dani1.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="https://blog-mysql-api-production.up.railway.app/api/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="https://blog-mysql-api-production.up.railway.app/api/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="https://blog-mysql-api-production.up.railway.app/api/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="https://blog-mysql-api-production.up.railway.app/api/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="https://blog-mysql-api-production.up.railway.app/api/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="https://blog-mysql-api-production.up.railway.app/api/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          {/* // si el currentUser no ha iniciado sesion, no mostrar el Write */}
          {currentUser && (
            <span className="write">
              <Link className="link" to="/write">
                Write
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
