import React from 'react'
import Navbar from '../../UI/Navbar';
import img1 from './images/back-button.png';
import img2 from './images/download.jpg';



const AddUser = () => {
    return (
        <>
            <Navbar/>
            <div class="back-btn mt-4">
        <img src={img1} alt=""/><span class="p-2">Back to List</span>
    </div>

    <section>
        <div class="account-sec">
            <div class="account-card">
                <div class="row g-0">
                    <div class="col-lg-3  col-md-3 col-sm-12 pb-3 ">
                        <div class="user-details">
                            <header class="d-flex align-items-center justify-content-center">
                                <h6 class="text-center">User Account</h6>
                            </header>
                            <div class="user-desc p-4">
                                <div class="profile text-center">
                                    <img src={img2} alt="" class="img-fluid w-25"/>
                                </div>
                                <div class="profile-detail text-center">
                                    <h5>Francis Walker</h5>
                                    <p>Project Manger</p>
                                </div>
                            </div>

                            <ul class="list-unstyled">
                                <li>
                                    <h6>Default Site</h6>
                                    <p>mysite.com</p>
                                </li>
                                <li>
                                    <h6>Created</h6>
                                    <p>28 May 2017 <br/> by
                                        <span>Leonard Robeerson</span>

                                    </p>
                                </li>
                                <li>
                                    <h6>Updated</h6>
                                    <p>19 Jul 2017 <br/> by
                                        <span>Stephen Palmer</span>
                                    </p>
                                </li>
                                <li>
                                    <button class="btn delete "> DELETE USER</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-12 account-det">
                        <div>
                            <header>
                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <div class="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="true">Profile</div>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <div class="nav-link" id="pills-Roles-tab" data-bs-toggle="pill" data-bs-target="#pills-Roles" role="tab" aria-controls="pills-Roles" aria-selected="false">Roles</div>
                                    </li>
                                </ul>
                            </header>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <form action="">
                                        <div class="my-2 row">
                                            <label for="inputname" class="col-md-2 col-12 col-form-label">Full Name <span>*</span></label>
                                            <div class="col-sm-10 col-12" col-md-10>
                                                <input type="name" class="form-control  is-valid" id="inputname" value="Fransic Walker" required/>
                                                <div class="valid-feedback">
                                                    <i class="fas fa-check"></i> Full name is Okay
                                                </div>
                                            </div>
                                        </div>
                                        <div class="my-2 row">
                                            <label for="inputemail" class="col-md-2 col-12 col-form-label"> Email <span>*</span></label>
                                            <div class="col-sm-10 col-12" col-md-10>
                                                <input type="email" class="form-control is-invalid" id="inputemail" required/>
                                                <div class="invalid-feedback" value="Fransic.Walker@mysite">
                                                    <i class="fas fa-times"></i> Invalid Email address.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="my-2 row">
                                            <label for="inputuser" class="col-md-2 col-12 col-form-label">User Type<span>*</span></label>
                                            <div class="col-sm-10 col-12" col-md-10>
                                                <select class="form-select is-invalid" aria-label="Default select example" required>
                                                    <option selected>Select the User Type here</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                  </select>
                                                <div class="invalid-feedback">
                                                    <i class="fas fa-times"></i> User Type cannot be Blank
                                                </div>
                                            </div>
                                        </div>
                                        <div class="my-2 row">
                                            <label for="inputstatus" class="col-md-2 col-12 col-form-label">Status<span>*</span></label>
                                            <div class="col-sm-10 col-12 col-md-10">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                                    <label class="form-check-label" for="inlineRadio1">Active</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                                                    <label class="form-check-label" for="inlineRadio2">Pending</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="my-2 row">
                                            <label for="inputuser" class="col-md-2 col-12 col-form-label">Language</label>
                                            <div class="col-sm-10 col-12 col-md-10">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected>Select default Language here</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                  </select>
                                            </div>
                                        </div>

                                        <div class="mt-5 row footer-card ">
                                            <div class="col-lg-8 col-md-6">
                                                <div class="btn update">Update User</div>
                                                <div class="btn cancel">Cancel</div>
                                            </div>
                                            <div class="col-lg-4 col-md-6 ">
                                                <p> <span>*</span> Indicates required fields</p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="tab-pane fade" id="pills-Roles" role="tabpanel" aria-labelledby="pills-Roles-tab">

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
}

export default AddUser
