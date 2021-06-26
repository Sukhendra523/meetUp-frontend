import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { permissionConstants } from "../../constants";

const Navbar = (props) => {
  const auth = useSelector((state) => state.auth);
  const { permissions } = auth;

  const { form } = props;
  const navbarOptions = [
    {
      labele: "Dashboard",
      link: "/",
      access: true,
    },
    {
      labele: "Meetings",
      link: "/meetings",
      access: true,
    },
    {
      labele: "Users",
      link: "/users",
      access: permissions.includes(permissionConstants.READ_USER),
    },
    {
      labele: "Roles",
      link: "/roles",
      access: permissions.includes(permissionConstants.WRITE_ROLE),
    },

    {
      labele: "Features",
      link: "/features",
      access: permissions.includes(permissionConstants.WRITE_FEATURE),
    },
  ];

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navbarOptions.map(
                (option, i) =>
                  option.access && (
                    <li className="nav-item mx-2" key={i}>
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to={option.link}
                      >
                        {option.labele}
                      </Link>
                    </li>
                  )
              )}
            </ul>
            {form && (
              <form className="d-flex">
                {form.search && (
                  <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={form.placeholder}
                      onChange={(e) => form.search(e.target.value)}
                    />
                  </div>
                )}
                {form.access && (
                  <Link
                    className="btn btn-primary p-2 ml-2 add-btn"
                    type="submit"
                  >
                    <i className="fa fa-plus-circle"></i> {form.button}
                  </Link>
                )}
              </form>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
