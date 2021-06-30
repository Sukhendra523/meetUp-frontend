import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { permissionConstants } from "../../constants";
import Navbar from "../UI/Navbar";
import img1 from "./Users/images/back-button.png";
import img2 from "./Users/images/right.png";
import img3 from "./Users/images/down-arrow.png";
import img4 from "./Users/images/download.jpg";
import img5 from "./Users/images/duplicate.png";
import img6 from "./Users/images/pencil.png";
import img7 from "./Users/images/left-and-right-arrows.png";
import img8 from "./Users/images/bin.png";
import { getAllMeetings } from "../../actions";
import { Link } from "react-router-dom";

const MeetingsList = () => {
  const auth = useSelector((state) => state.auth);
  const { permissions } = auth;
  const dispatch = useDispatch();
  const access = permissions.includes(permissionConstants.WRITE_MEETING);

  useEffect(() => {
    dispatch(getAllMeetings());
  }, []);
  const { meetings, loading, message } = useSelector((state) => state.meeting);
  console.log("meeting :::::::>>>", meetings);
  const search = () => {};

  return (
    <>
      <Navbar
        form={{
          link: "meeting/create",
          button: "Create meeting",
          search,
          placeholder: "Search Meeting",
          access: permissions.includes(permissionConstants.WRITE_MEETING),
        }}
      />
      <section className="pt-4">
        <div className="container">
          {/* <div className="row heading-content px-3 mt-5">
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
                        Title
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
                        Organiser
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
                        Date
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
                        Timing
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
                        Attendees
                      </a>
                    </li>
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
   */}
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
                          <span> Title</span>
                        </th>
                        <th scope="col" className="dropdown-toggle">
                          <span>Organiser</span>
                        </th>
                        <th scope="col" className="dropdown-toggle">
                          <span>Date</span>
                        </th>
                        <th scope="col" className="dropdown-toggle">
                          <span>Timing</span>
                        </th>
                        <th
                          style={{ width: "300px" }}
                          scope="col"
                          className="dropdown-toggle"
                        >
                          <span>Attendees</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {meetings &&
                        meetings.map((meeting, i) => {
                          const start = meeting.schedule.start;
                          const end = meeting.schedule.end;
                          const date =
                            new Date(start).getDate() +
                            "-" +
                            (new Date(start).getMonth() + 1) +
                            "-" +
                            new Date(start).getFullYear();
                          const timing = {
                            start:
                              new Date(start).getHours() +
                              1 +
                              ":" +
                              (new Date(start).getMinutes() + 1),

                            end:
                              new Date(end).getHours() +
                              1 +
                              ":" +
                              (new Date(end).getMinutes() + 1),
                          };
                          return (
                            <tr key={i}>
                              <th scope="row">
                                <input
                                  className="form-check-input"
                                  onChange={() => {}}
                                  type="checkbox"
                                />
                              </th>
                              <td>{meeting.title}</td>
                              <td>
                                <img
                                  src={
                                    meeting.createdBy.image
                                      ? meeting.createdBy.image
                                      : img4
                                  }
                                  style={{
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                  }}
                                  alt=""
                                />
                                {meeting.createdBy.username}
                              </td>
                              <td>{date}</td>
                              <td>{timing.start + " to " + timing.end}</td>
                              <td
                                className="d-flex flex-wrap "
                                style={{ width: "300px" }}
                              >
                                {meeting.attendees.map((attendee, i) => (
                                  <span
                                    style={{
                                      background: "#d7d7e7",
                                      borderRadius: "20px",
                                      padding: "5px",
                                      margin: "1px",
                                    }}
                                    key={i}
                                  >
                                    {attendee.email}
                                  </span>
                                ))}
                              </td>
                              {access && (
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
                                          to={`/meeting/${meeting._id}`}
                                        >
                                          <img src={img6} alt="" /> Edit
                                        </Link>
                                      </li>
                                      <li>
                                        <p
                                          className="dropdown-item"
                                          onClick={() => {}}
                                        >
                                          <img src={img8} alt="" />
                                          Remove
                                        </p>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              )}{" "}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="d-flex justify-content-center">
            <img src={img1} alt="" className="mx-1" />
            <div>1 2 . . . 9 10</div>
            <img src={img2} alt="" className="mx-1" />
          </div> */}
        </div>
      </section>
      <div className="container mt-5 px-2"></div>
    </>
  );
};

export default MeetingsList;
