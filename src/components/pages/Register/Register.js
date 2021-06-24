import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../actions";
import Input from "../../UI/Input";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userSignUp = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const user = {
        email,
        username,
        contact,
        password,
      };
      dispatch(signup(user));
    } else {
      setErrorMessage("Password do not match");
      alert(errorMessage);
    }
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <section className="wrapper">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-lg-10 offset-1">
              <div className="row g-0">
                <div className="col-lg-6 col-md-6">
                  <div className="card register-card">
                    <div className="top">
                      <form onSubmit={userSignUp}>
                        <Input
                          icon="fa-user"
                          type="username"
                          placeholder="Username"
                          ariaLabel="Username"
                          required={true}
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                          icon="fa-envelope"
                          type="email"
                          placeholder="Email"
                          ariaLabel="Email"
                          required={true}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                          icon="fa-phone-alt"
                          type="tel"
                          placeholder="Phone Number"
                          ariaLabel="Email"
                          required={true}
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                        <Input
                          icon="fa-key"
                          type="password"
                          placeholder="Password"
                          ariaLabel="Password"
                          required={true}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                          icon="fa-key"
                          type="password"
                          placeholder="Confirm Password"
                          ariaLabel="Password"
                          required={true}
                          value={confirmPassword}
                          onChange={(e) => setconfirmPassword(e.target.value)}
                        />

                        <div className="d-flex justify-content-between align-items-center my-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              Remember me
                            </label>
                          </div>
                          <input
                            type="submit"
                            value="Register"
                            className="btn btn-primary"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="text-center divider">
                      <p className="bar">or</p>
                    </div>
                    <div className="bottom">
                      <div
                        className="btn-group my-2"
                        role="group"
                        aria-label="Basic example"
                      >
                        <div className="fb small-btn">
                          <i className="fab fa-facebook-square"></i>
                        </div>
                        <button type="button" className="btn facebook">
                          Login with Facebook
                        </button>
                      </div>
                      <div
                        className="btn-group  my-2"
                        role="group"
                        aria-label="Basic example"
                      >
                        <div className="small-btn tw">
                          <i className="fab fa-twitter"></i>
                        </div>
                        <button type="button" className="btn twitter">
                          Login with Twitter
                        </button>
                      </div>
                      <div
                        className="btn-group  my-2"
                        role="group"
                        aria-label="Basic example"
                      >
                        <div className="small-btn G ">
                          <i className="fab fa-google"></i>
                        </div>
                        <button type="button" className="btn google">
                          Login with Google
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="card-1 border-0 register-card">
                    <div
                      id="carouselExampleDark"
                      className="carousel carousel-dark slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleDark"
                          data-bs-slide-to="0"
                          className="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleDark"
                          data-bs-slide-to="1"
                          aria-label="Slide 2"
                        ></button>
                      </div>
                      <div className="carousel-inner">
                        <div
                          className="carousel-item active"
                          data-bs-interval="10000"
                        >
                          <img src="/images/image1.jpg" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                          <img src="/images/image2.jpg" alt="..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
