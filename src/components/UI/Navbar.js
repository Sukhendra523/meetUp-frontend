import React from 'react'
import {Link} from 'react-router-dom';


const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <a className="nav-link" aria-current="page" href="/">Dashboard</a>
                            </li>
                            <li className="nav-item  mx-2">
                                <a className="nav-link" href="/">Meetings</a>
                            </li>
                            <li className="nav-item  mx-2">
                                <a className="nav-link" href="/">Roles</a>
                            </li>
                            <li className="nav-item  mx-2">
                                <a className="nav-link active" href="/">Users</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <div className="form-group has-search">
                                <span className="fa fa-search form-control-feedback"></span>
                                <input type="text" className="form-control" placeholder="Search User" />
                            </div>
                           <Link to="/"><button className="btn btn-primary ml-2 add-btn" type="submit"><i className="fa fa-plus-circle"></i> ADD USER</button>
                           </Link> 
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
