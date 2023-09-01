import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import { useAuth } from '../../context/auth'
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import useArtist from '../../hooks/useArtist';
import { Badge } from "antd";
import { useCart } from "../../context/cart";
import { BsCart4 } from "react-icons/bs";



const Header = () => {
  const categories = useCategory();
  const artists = useArtist();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-relative">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div id="navbarTogglerDemo01" className="collapse navbar-collapse">
            <Link to = "/" className="navbar-brand">
                <span>Happiness</span> Club  
            </Link>
            <SearchInput/>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 menu-nav">
              <li className="nav-item">
            
                <NavLink 
                  to = "/" 
                  className="nav-link"
                  >
                    Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/allArtists"}
                  data-bs-toggle="dropdown"
                >
                  Artists
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/allArtists"}>
                      All Artists
                    </Link>
                  </li>
                  {artists?.map((a) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/artist/${a.slug}`}
                      >
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name} 
                    </NavLink>
                    <ul className="dropdown-menu ">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item  cart">
                  <NavLink to = "/cart" className="nav-link " href="#">
                  <Badge  color="#0DA574" count={cart?.length} showZero offset={[10, -5]}>
                        cart
                  </Badge> 
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header