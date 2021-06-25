import React, { useEffect } from "react";
import Navbar from "../../UI/Navbar";
import img1 from "./images/back-button.png";
import img2 from "./images/right.png";
import img3 from "./images/down-arrow.png";
import img4 from "./images/download.jpg";
import img5 from "./images/duplicate.png";
import img6 from "./images/pencil.png";
import img7 from "./images/left-and-right-arrows.png";
import img8 from "./images/bin.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../actions";

const UserList = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(getAllUsers());
    }
  }, []);

  const { users } = useSelector((state) => state.user);
  console.log("users", users);
  const search = () => {};
  return (
    <>
      <Navbar
        form={{
          link: "user/create",
          button: "Create user",
          search,
          placeholder: "Search User",
        }}
      />
      <section className="pt-4">
        <div className="container">
          <div className="row heading-content px-3 mt-5">
            <div className="col-lg-6 d-flex align-items-center">
              <p>
                Showing <span>10</span> of <span>98</span> Users
              </p>
              <div className="dropdown" style={{ marginLeft: 30 + "px" }}>
                <div
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Actions
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
              <div className="d-flex align-items-center">
                <img src={img1} alt=" " className="mx-1" />
                <img src={img2} alt=" " />
                <div className="dropdown" width="100">
                  <div
                    className=""
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={img3} alt="" />
                  </div>
                  <ul
                    className="dropdown-menu menu-list"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="/">
                        <span>
                          <i className="fas fa-bars"></i>
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                            checked
                          />
                          <i className="fas fa-lock"></i>
                        </span>{" "}
                        username
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        <span>
                          <i className="fas fa-bars"></i>
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                            checked
                          />
                          <i className="fas fa-lock"></i>
                        </span>{" "}
                        Email
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        <span>
                          <i className="fas fa-bars"></i>
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                            checked
                          />
                          <i className="fas fa-lock"></i>
                        </span>{" "}
                        Role
                      </a>
                    </li>
                    {/* <li>
                      <a className="dropdown-item" href="/">
                        <span>
                          <i className="fas fa-bars"></i>
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                            checked
                          />
                          <i className="fas fa-lock"></i>
                        </span>{" "}
                        Last Login
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        <span>
                          <i className="fas fa-bars"></i>
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                            checked
                          />
                          <i className="fas fa-lock"></i>
                        </span>{" "}
                        Status
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        <span>
                          <i className="fas fa-bars"></i>
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                            checked
                          />
                          <i className="fas fa-lock"></i>
                        </span>{" "}
                        Privilage
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        <span>
                          <i className="fas fa-bars"></i>
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                            checked
                          />
                          <i className="fas fa-lock"></i>
                        </span>{" "}
                        Created Date
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        <span>
                          <i className="fas fa-bars"></i>
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                            checked
                          />
                          <i className="fas fa-lock"></i>
                        </span>{" "}
                        Created By
                      </a>
                    </li>*/}
                  </ul>
                </div>
              </div>
              <div className="dropdown">
                <div
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Column :<b>Expanded</b>
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="/">
                      <img src={img7} alt="" className="mr-1" /> Condensed
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      <img src={img7} alt="" className="mr-1" /> Expended
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card table-card">
                <div className="table-responsive">
                  <table className="table table-responsive table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                          />
                        </th>

                        <th scope="col" className="dropdown-toggle">
                          <span> username</span>
                        </th>
                        <th scope="col" className="dropdown-toggle">
                          <span>Email</span>
                        </th>
                        <th scope="col" className="dropdown-toggle">
                          <span>Role</span>
                        </th>
                        {/* <th scope="col" className="dropdown-toggle">
                          <span>User Type</span>
                        </th>
                        <th scope="col" className="dropdown-toggle">
                          <span>Status</span>
                        </th>
                        <th scope="col" className="dropdown-toggle">
                          <span>Date</span>
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((user, i) => (
                          <tr key={i}>
                            <th scope="row">
                              <input
                                className="form-check-input"
                                onChange={() => {}}
                                type="checkbox"
                              />
                            </th>

                            <td>
                              <img
                                src={user.image ? user.image : img4}
                                width="25"
                                alt=""
                              />
                              {user.username}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.role.name}</td>
                            <td>
                              <div className="dropdown dots">
                                <div
                                  className=""
                                  type="button"
                                  id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fa fa-ellipsis-h ms-2 dropdown">
                                    {" "}
                                  </i>
                                </div>
                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to={`/user/${user._id}`}
                                    >
                                      <img src={img6} alt="" /> Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="/">
                                      <img src={img8} alt="" />
                                      Remove
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/" className="dropdown-item">
                                      <img src={img5} alt="" />
                                      Duplicate
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))}
                      {/* <tr>
                        <th scope="row">
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                          />
                        </th>
                        
                        <td>
                          <img src={img4} width="25" alt="" />
                          Joe Nelson
                        </td>
                        <td>aracely@gmail.com</td>
                        <td>mysite.com</td>
                        <td>Account manager</td>
                        <td>
                          <span className="btn btn-active"> Active</span>
                        </td>
                        <td>
                          <span className="fw-bolder">3 Sept 2017</span>
                          <div className="dropdown dots">
                            <div
                              className=""
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-h ms-2 dropdown">
                                {" "}
                              </i>
                            </div>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <Link
                                  className="dropdown-item"
                                  to="/user/12326"
                                >
                                  <img src={img6} alt="" /> Edit
                                </Link>
                              </li>
                              <li>
                                <a className="dropdown-item" href="/">
                                  <img src={img8} alt="" />
                                  Remove
                                </a>
                              </li>
                              <li>
                                <a href="/" className="dropdown-item">
                                  <img src={img5} alt="" />
                                  Duplicate
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                          />
                        </th>
                        <td>
                          <img src={img4} width="25" alt="" />
                          Devin Doglus
                        </td>
                        <td>aracely@gmail.com</td>
                        <td>mysite.com</td>
                        <td>Account manager</td>
                        <td>
                          <span className="btn btn-pending">Pending</span>
                        </td>
                        <td>
                          <span className="fw-bolder">3 Sept 2017</span>
                          <div className="dropdown dots">
                            <div
                              className=""
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-h ms-2 dropdown">
                                {" "}
                              </i>
                            </div>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a className="dropdown-item" href="/">
                                  <img src={img6} alt="" /> Edit
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="/">
                                  <img src={img8} alt="" />
                                  Remove
                                </a>
                              </li>
                              <li>
                                <a href="/" className="dropdown-item">
                                  <img src={img5} alt="" />
                                  Duplicate
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                          />
                        </th>
                        <td>
                          <img src={img4} width="25" alt="" />
                          John Wick
                        </td>
                        <td>aracely@gmail.com</td>
                        <td>mysite.com</td>
                        <td>Account manager</td>
                        <td>
                          <span className="btn btn-pending">Pending</span>
                        </td>
                        <td>
                          <span className="fw-bolder">3 Sept 2017</span>
                          <div className="dropdown dots">
                            <div
                              className=""
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-h ms-2 dropdown">
                                {" "}
                              </i>
                            </div>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a className="dropdown-item" href="/">
                                  <img src={img6} alt="" /> Edit
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="/">
                                  <img src={img8} alt="" />
                                  Remove
                                </a>
                              </li>
                              <li>
                                <a href="/" className="dropdown-item">
                                  <img src={img5} alt="" />
                                  Duplicate
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                          />
                        </th>
                        <td>
                          <img src={img4} width="25" alt="" />
                          Mario Wong
                        </td>
                        <td>aracely@gmail.com</td>
                        <td>mysite.com</td>
                        <td>Account manager</td>
                        <td>
                          <span className="btn btn-active"> Active</span>
                        </td>
                        <td>
                          <span className="fw-bolder">3 Sept 2017</span>
                          <div className="dropdown dots">
                            <div
                              className=""
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-h ms-2 dropdown">
                                {" "}
                              </i>
                            </div>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a className="dropdown-item" href="/">
                                  <img src={img6} alt="" /> Edit
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="/">
                                  <img src={img8} alt="" />
                                  Remove
                                </a>
                              </li>
                              <li>
                                <a href="/" className="dropdown-item">
                                  <img src={img5} alt="" />
                                  Duplicate
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <input
                            className="form-check-input"
                            onChange={() => {}}
                            type="checkbox"
                          />
                        </th>
                        <td>
                          <img src={img4} width="25" alt="" />
                          Gerorge Shelton
                        </td>
                        <td>aracely@gmail.com</td>
                        <td>mysite.com</td>
                        <td>Account manager</td>
                        <td>
                          <span className="btn btn-active"> Active</span>
                        </td>
                        <td>
                          <span className="fw-bolder">3 Sept 2017</span>
                          <div className="dropdown dots">
                            <div
                              className=""
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-h ms-2 dropdown">
                                {" "}
                              </i>
                            </div>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a className="dropdown-item" href="/">
                                  <img src={img6} alt="" /> Edit
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="/">
                                  <img src={img8} alt="" />
                                  Remove
                                </a>
                              </li>
                              <li>
                                <a href="/" className="dropdown-item">
                                  <img src={img5} alt="" />
                                  Duplicate
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <img src={img1} alt="" className="mx-1" />
            <div>1 2 . . . 9 10</div>
            <img src={img2} alt="" className="mx-1" />
          </div>
        </div>
      </section>
      <div className="container mt-5 px-2"></div>
    </>
  );
};

export default UserList;
