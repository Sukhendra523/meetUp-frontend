import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch, useSelector } from "react-redux";
import { facebookLogin, googleLogin, login } from "../../../actions";
import Input from "../../UI/Input";
import LoginWithButton from "../../UI/LoginWithButton";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userfacebookLogin = (response) => {
    dispatch(facebookLogin(response));
  };

  const userGoogleLogin = (response) => {
    dispatch(googleLogin(response.tokenId));
  };

  const userLogin = (event) => {
    event.preventDefault();

    const user = {
      email,
      username,
      password,
    };
    dispatch(login(user));
  };
  if (auth.authenticated) {
    return <Redirect to="/meetings" />;
  }
  return (
    <>
      <section className="wrapper">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-lg-10 offset-1">
              <div className="row g-0">
                <div className="col-lg-6 col-md-6">
                  <div className="card ">
                    <div className="top">
                      <form onSubmit={userLogin}>
                        <Input
                          icon="fa fa-user"
                          type="text"
                          placeholder="Username or email"
                          ariaLabel="Username or email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setUsername(e.target.value);
                          }}
                        />
                        <Input
                          icon="fa fa-key"
                          type="password"
                          placeholder="Password"
                          ariaLabel="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                            value="Login"
                            className="btn btn-primary"
                          />
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                          <span>
                            <Link to="/Register">Register Now</Link>
                          </span>
                          <p className="my-2">Forget Password?</p>
                        </div>
                      </form>
                    </div>
                    <div className="text-center divider">
                      <p className="bar">or</p>
                    </div>
                    <div className="bottom">
                      <LoginWithButton site="fb" icon="fa-facebook-square">
                        <FacebookLogin
                          appId="872208516665470"
                          autoLoad={false}
                          callback={userfacebookLogin}
                          render={(renderProps) => (
                            <button
                              onClick={renderProps.onClick}
                              type="button"
                              className="btn facebook"
                            >
                              Login with Facebook
                            </button>
                          )}
                        />
                      </LoginWithButton>

                      <LoginWithButton site="G" icon="fa-google">
                        <GoogleLogin
                          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                          onSuccess={userGoogleLogin}
                          onFailure={userGoogleLogin}
                          cookiePolicy={"single_host_origin"}
                          render={(renderProps) => (
                            <button
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                              className="btn google"
                            >
                              Login with Google
                            </button>
                          )}
                        ></GoogleLogin>
                      </LoginWithButton>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="card-1  border-0 ">
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

export default Login;
