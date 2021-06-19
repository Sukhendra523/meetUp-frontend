import React from 'react';
import img1 from '../Login/image1.jpg';
import img2 from '../Login/image2.jpg';
import '../Login/Login.css'

function Register() {
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
                                    <form action="">
                                        <div className="input-group flex-nowrap mb-3">
                                            <span className="input-group-text" id="addon-wrapping"><i className="fa fa-user"></i></span>
                                            <input type="username" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" required/>
                                        </div>
                                        <div className="input-group flex-nowrap my-3">
                                            <span className="input-group-text" id="addon-wrapping"><i className="fa fa-envelope"></i></span>
                                            <input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" required/>
                                        </div>
                                        <div className="input-group flex-nowrap my-3">
                                            <span className="input-group-text" id="addon-wrapping"><i className="fa fa-phone-alt"></i></span>
                                            <input type="tel" className="form-control" placeholder="Phone Number" aria-label="Email" aria-describedby="addon-wrapping" required/>
                                        </div>
                                        <div className="input-group flex-nowrap my-3">
                                            <span className="input-group-text" id="addon-wrapping"><i className="fa fa-key"></i></span>
                                            <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" required/>
                                        </div>
                                        <div className="input-group flex-nowrap my-3">
                                            <span className="input-group-text" id="addon-wrapping"><i className="fa fa-key"></i></span>
                                            <input type="password" className="form-control" placeholder="Confirm Password" aria-label="Password" aria-describedby="addon-wrapping" required/>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center my-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                              Remember me
                                            </label>
                                            </div>
                                            <div className="btn btn-primary">Register</div>
                                        </div>
                                    </form>
                                </div>
                                <div className="text-center divider">
                                    <p className="bar">or</p>
                                </div>
                                <div className="bottom">
                                    <div className="btn-group my-2" role="group" aria-label="Basic example">
                                        <div className="fb small-btn"><i className="fab fa-facebook-square"></i></div>
                                        <button type="button" className="btn facebook">Login with Facebook</button>
                                    </div>
                                    <div className="btn-group  my-2" role="group" aria-label="Basic example">
                                        <div className="small-btn tw"><i className="fab fa-twitter"></i></div>
                                        <button type="button" className="btn twitter">Login with Twitter</button>
                                    </div>
                                    <div className="btn-group  my-2" role="group" aria-label="Basic example">
                                        <div className="small-btn G "><i className="fab fa-google"></i></div>
                                        <button type="button" className="btn google">Login with Google</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="card-1 border-0 register-card">
                                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    </div>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active" data-bs-interval="10000">
                                            <img src={img1} alt="..."/>
                                        </div>
                                        <div className="carousel-item" data-bs-interval="2000">
                                            <img src={img2} alt="..."/>
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
    )
};

export default Register;
