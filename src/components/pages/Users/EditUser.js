import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";

import {
  deleteUser,
  getAllUsers,
  getUserDetails,
  updateProfile,
  updateUser,
} from "../../../actions";
import { getAllRoles } from "../../../actions";
import Navbar from "../../UI/Navbar";
import img1 from "./images/back-button.png";
import img2 from "./images/download.jpg";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUserDetails(id));
  // }, []);

  useEffect(() => {
    dispatch(getAllRoles());
  }, []);
  const { users, message, loading } = useSelector((state) => state.user);
  const user = users.find(({ _id }) => _id === id);
  console.log("user", user);
  const { roles } = useSelector((state) => state.role);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image);
  const [role, setRole] = useState(user.role._id);
  const [deleted, setDeleted] = useState(false);

  console.log("role", role);

  const updateUserHandler = () => {
    const user = {
      username,
      email,
      role,
    };

    dispatch(updateUser(user, id));
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser(id));
    setDeleted(true);
  };
  if (deleted) {
    return <Redirect to="/users" />;
  }

  const updateUserProfile = (event) => {
    console.log("event.target.files[0]", event.target.files[0]);

    console.log("image :::::&&&&&", image);
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    dispatch(updateProfile(formData, id));
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <Navbar />
      <div className="back-btn pt-5 mt-4">
        <img src={img1} alt="" />
        <Link to="/users">
          <span className="p-2">Back to List</span>
        </Link>
      </div>

      <section>
        <div className="account-sec">
          <div className="account-card">
            <div className="row g-0">
              <div className="col-lg-3  col-md-3 col-sm-12 pb-3 ">
                <div className="user-details">
                  <header className="d-flex align-items-center justify-content-center">
                    <h6 className="text-center">User Account</h6>
                  </header>
                  <div className="user-desc p-4">
                    <div
                      className="profile text-center"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="file"
                        onChange={updateUserProfile}
                        style={{
                          position: "absolute",
                          width: "25%",
                          height: "100%",
                          opacity: 0,
                          border: "1px solid red",
                        }}
                        className="profile_uploder_img"
                        accept="image/*"
                      />
                      <img
                        style={{
                          borderRadius: "50%",
                          height: "100px",
                          height: "100px",
                        }}
                        src={image ? image : img2}
                        alt=""
                        className="img-fluid "
                      />
                    </div>
                    <div className="profile-detail text-center">
                      <h3>{user.username}</h3>
                      <h5>{user.email}</h5>
                      <p>{user.role?.name}</p>
                    </div>
                  </div>

                  <ul className="list-unstyled">
                    {/* <li>
                      <h6>Default Site</h6>
                      <p>mysite.com</p>
                    </li>
                    <li>
                      <h6>Created</h6>
                      <p>
                        28 May 2017 <br /> by
                        <span>Leonard Robeerson</span>
                      </p>
                    </li>
                    <li>
                      <h6>Updated</h6>
                      <p>
                        19 Jul 2017 <br /> by
                        <span>Stephen Palmer</span>
                      </p>
                    </li> */}
                    <li>
                      <button
                        className="btn delete "
                        onClick={deleteUserHandler}
                      >
                        {" "}
                        DELETE ACCOUNT
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-12 account-det">
                <div>
                  <header>
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <div
                          className="nav-link active"
                          id="pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="true"
                        >
                          Profile
                        </div>
                      </li>
                      <li className="nav-item" role="presentation">
                        <div
                          className="nav-link"
                          id="pills-Roles-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-Roles"
                          role="tab"
                          aria-controls="pills-Roles"
                          aria-selected="false"
                        >
                          {message}
                        </div>
                      </li>
                    </ul>
                  </header>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <form action="">
                        <div className="my-2 row">
                          <label
                            for="inputname"
                            className="col-md-2 col-12 col-form-label"
                          >
                            Username <span>*</span>
                          </label>
                          <div className="col-sm-10 col-12" col-md-10>
                            <input
                              type="name"
                              className="form-control  is-valid"
                              id="inputname"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                            {/* <div className="valid-feedback">
                              <i className="fas fa-check"></i> Full name is Okay
                            </div> */}
                          </div>
                        </div>
                        <div className="my-2 row">
                          <label
                            for="inputemail"
                            className="col-md-2 col-12 col-form-label"
                          >
                            {" "}
                            Email <span>*</span>
                          </label>
                          <div className="col-sm-10 col-12" col-md-10>
                            <input
                              type="email"
                              className="form-control is-invalid"
                              id="inputemail"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            {/* <div
                              className="invalid-feedback"
                              value="Fransic.Walker@mysite"
                            >
                              <i className="fas fa-times"></i> Invalid Email
                              address.
                            </div> */}
                          </div>
                        </div>
                        <div className="my-2 row">
                          <label
                            for="inputuser"
                            className="col-md-2 col-12 col-form-label"
                          >
                            User Type<span>*</span>
                          </label>
                          <div className="col-sm-10 col-12" col-md-10>
                            <select
                              className="form-select is-invalid"
                              aria-label="Default select example"
                              required
                              onChange={(e) => setRole(e.target.value)}
                            >
                              <option value={role} selected>
                                {user.role?.name}
                              </option>
                              {roles.map((role, i) => (
                                <option key={i} value={role._id}>
                                  {role.name}
                                </option>
                              ))}
                            </select>
                            {/* <div className="invalid-feedback">
                              <i className="fas fa-times"></i> User Type cannot be
                              Blank
                            </div> */}
                          </div>
                        </div>
                        {/* <div className="my-2 row">
                          <label
                            for="inputstatus"
                            className="col-md-2 col-12 col-form-label"
                          >
                            Status<span>*</span>
                          </label>
                          <div className="col-sm-10 col-12 col-md-10">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                              />
                              <label
                                className="form-check-label"
                                for="inlineRadio1"
                              >
                                Active
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                              />
                              <label
                                className="form-check-label"
                                for="inlineRadio2"
                              >
                                Pending
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="my-2 row">
                          <label
                            for="inputuser"
                            className="col-md-2 col-12 col-form-label"
                          >
                            Language
                          </label>
                          <div className="col-sm-10 col-12 col-md-10">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>
                                Select default Language here
                              </option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div> */}

                        <div className="mt-5 row footer-card ">
                          <div className="col-lg-8 col-md-6">
                            <div
                              className="btn update"
                              onClick={updateUserHandler}
                            >
                              Update User
                            </div>
                            <div className="btn cancel">Cancel</div>
                          </div>
                          <div className="col-lg-4 col-md-6 ">
                            <p>
                              {" "}
                              <span>*</span> Indicates required fields
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-Roles"
                      role="tabpanel"
                      aria-labelledby="pills-Roles-tab"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditUser;
