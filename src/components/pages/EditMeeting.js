import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";

import {} from "../../actions";
import Navbar from "../UI/Navbar";
import img1 from "./Users/images/back-button.png";
import img2 from "./Users/images/download.jpg";
import $ from "jquery";
const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserDetails(id));
  // }, []);

  const { users } = useSelector((state) => state.user);
  const { meetings, message, loading } = useSelector((state) => state.meeting);
  const meeting = id && meetings.find(({ _id }) => _id === id);

  console.log("meeting", meeting);

  const start = meeting ? meeting.schedule.start : new Date();
  const end = meeting ? meeting.schedule.end : new Date();

  const meetingDate =
    new Date(start).getFullYear() +
    "-" +
    (new Date(start).getMonth() + 1 >= 10
      ? new Date(start).getMonth() + 1
      : "0" + (new Date(start).getMonth() + 1)) +
    "-" +
    (new Date(start).getDate() + 1 >= 10
      ? new Date(start).getDate() + 1
      : "0" + (new Date(start).getDate() + 1));

  const timing = {
    start:
      new Date(start).getHours() + 1 + ":" + (new Date(start).getMinutes() + 1),

    end: new Date(end).getHours() + 1 + ":" + (new Date(end).getMinutes() + 1),
  };

  const [title, setTitle] = useState(meeting ? meeting.title : "");
  const [date, setDate] = useState(meetingDate);
  const [timingStart, setTimingStart] = useState(timing.start);
  const [timingEnd, setTimingEnd] = useState(timing.end);
  const [attendees, setAttendees] = useState(
    meeting
      ? meeting.attendees.map(({ _id, email, username }) => ({
          _id,
          email,
        }))
      : []
  );

  const [description, setDescription] = useState(
    meeting ? meetings.description : ""
  );
  const [searchedEmails, setSearchedEmails] = useState([]);
  const [deleted, setDeleted] = useState(false);
  console.log("date", date + "T" + timingStart);

  const updateMeetingHandler = () => {
    const meeting = {
      title,
      schedule: {
        start: date + "T" + timingStart,
        end: date + "T" + timingEnd,
      },
      attendees: attendees.map(({ _id }) => _id),
      description,
    };
    // dispatch(updateMeeting(meeting, id));
  };

  const deleteMeetingHandler = () => {
    // dispatch(deleteMeeting(id));
    setDeleted(true);
  };
  if (deleted) {
    return <Redirect to="/meetings" />;
  }
  const keyChangeHandler = (e) => {
    let newEnteredEmail = e.target.value;

    if (newEnteredEmail.includes(",")) {
      let newEmail = newEnteredEmail.replace(",", "");
      console.log(users);
      const user = users.find(({ email }) => email === newEmail);
      if (user) {
        const { _id, email } = user;
        setAttendees([...attendees, { _id, email }]);
        e.target.value = "";
      } else {
        return alert("User Not registered");
      }
    }
    console.log("users.....", users);

    if (newEnteredEmail) {
      const searchResult = users.filter(({ email }) =>
        new RegExp(newEnteredEmail, "gi").test(email)
      );
      console.log("searchResult", searchResult);
      if (searchResult) {
        setSearchedEmails(
          searchResult.map(({ _id, email }) => ({ _id, email }))
        );
      }
    } else {
      setSearchedEmails([]);
    }
  };

  // const searchUserEmails = (event) => {
  //   console.log(event.target.value);
  // };

  // const updateUserProfile = (event) => {
  //   console.log("event.target.files[0]", event.target.files[0]);

  //   console.log("timing :::::&&&&&", timing);
  //   const formData = new FormData();
  //   formData.append("image", event.target.files[0]);
  //   dispatch(updateProfile(formData, id));
  //   setImage(URL.createObjectURL(event.target.files[0]));
  // };

  return (
    <>
      <Navbar />
      <div className="back-btn pt-5 mt-4">
        <img src={img1} alt="" />
        <Link to="/meetings">
          <span className="p-2">Back to List</span>
        </Link>
      </div>

      <section>
        <div className="account-sec">
          <div className="account-card">
            <div className="row g-0">
              {meeting && (
                <div className="col-lg-3  col-md-3 col-sm-12 pb-3 ">
                  <div className="user-details">
                    <header className="d-flex align-items-center justify-content-center">
                      <h6 className="text-center">Meeting Details</h6>
                    </header>
                    <div className="user-desc p-4">
                      <div
                        className="profile text-center"
                        style={{ position: "relative" }}
                      >
                        <img
                          style={{
                            height: "100px",
                            height: "100px",
                          }}
                          src={
                            meeting.createdBy.image
                              ? meeting.createdBy.image
                              : img2
                          }
                          alt=""
                          className="img-fluid "
                        />
                      </div>
                      <div className="profile-detail text-center">
                        <h3>{meeting.title}</h3>
                        <h5>{meeting.createdBy.username}</h5>
                        <p>{date}</p>
                        <p>{timingStart + " to " + timingEnd}</p>
                        {meeting.attendees.map((attendee, i) => (
                          <img
                            key={i}
                            src={attendee.image ? attendee.image : img2}
                            style={{
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                            }}
                            alt=""
                          />
                        ))}
                      </div>
                    </div>

                    <ul className="list-unstyled">
                      <li>
                        <button
                          className="btn delete "
                          onClick={deleteMeetingHandler}
                        >
                          {" "}
                          DELETE MEETING
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
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
                          aria-selected={"true"}
                        >
                          Meeting Details
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
                          Meeting Features
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
                      <form>
                        <div className="my-2 row">
                          <label
                            for="inputname"
                            className="col-md-2 col-12 col-form-label"
                          >
                            Title <span>*</span>
                          </label>
                          <div className="col-sm-10 col-12">
                            <input
                              type="name"
                              className="form-control  is-valid"
                              id="inputname"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
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
                            Date <span>*</span>
                          </label>
                          <div className="col-sm-10 col-12">
                            <input
                              type="date"
                              className="form-control is-invalid"
                              id="inputemail"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
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
                            for="inputemail"
                            className="col-md-2 col-12 col-form-label"
                          >
                            {" "}
                            Start <span>*</span>
                          </label>
                          <div className="col-md-4 col-12">
                            <input
                              type="time"
                              className="form-control is-invalid"
                              id="inputemail"
                              value={timingStart}
                              onChange={(e) => setTimingStart(e.target.value)}
                              required
                            />
                          </div>
                          <label
                            for="inputemail"
                            className="col-md-2 col-12 col-form-label"
                          >
                            {" "}
                            End <span>*</span>
                          </label>
                          <div className="col-md-4 col-12">
                            <input
                              type="time"
                              className="form-control is-invalid"
                              id="inputemail"
                              value={timingEnd}
                              onChange={(e) => setTimingEnd(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="my-2 row"></div>
                        <div className="my-2 row">
                          <label
                            for="inputname"
                            className="col-md-2 col-12 col-form-label"
                          >
                            Description <span>*</span>
                          </label>
                          <div className="col-sm-10 col-12">
                            <textarea
                              rows={4}
                              cols={4}
                              type="name"
                              className="form-control  is-valid"
                              id="inputname"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                            ></textarea>
                            {/* <div className="valid-feedback">
                              <i className="fas fa-check"></i> Full name is Okay
                            </div> */}
                          </div>
                        </div>
                        <div className="my-2 row">
                          <label
                            for="inputname"
                            className="col-md-2 col-12 col-form-label"
                          >
                            Attendees <span>*</span>
                          </label>
                          <div className="col-sm-10 col-12">
                            {
                              <div
                                id="attendees-list "
                                className="d-flex flex-wrap"
                                style={{
                                  borderRadius: "20px",
                                  border: "2px solid black",
                                  padding: "5px",
                                }}
                              >
                                {attendees?.length > 0 &&
                                  attendees.map(({ email }) => (
                                    <div
                                      className=""
                                      style={{
                                        background: "#d7d7e7",
                                        borderRadius: "20px",
                                        padding: "5px",
                                        margin: "1px",
                                      }}
                                    >
                                      <span>{email}</span>
                                      <span
                                        onClick={() =>
                                          setAttendees(
                                            attendees.filter(
                                              (attendee) =>
                                                attendee.email !== email
                                            )
                                          )
                                        }
                                        className="p-2"
                                      >
                                        <i
                                          class="fas fa-times"
                                          style={{ color: "red" }}
                                        ></i>
                                      </span>
                                    </div>
                                  ))}
                                <input
                                  style={{
                                    width: "30%",
                                    border: "none",
                                    outline: "none",
                                    borderRadius: "0",
                                    color: "black",
                                    fontSize: "20px",
                                  }}
                                  id="attendees"
                                  // value={newEmail}
                                  onChange={keyChangeHandler}
                                />
                              </div>
                            }

                            <ul style={{ listStyle: "none" }}>
                              {searchedEmails.length > 0 &&
                                searchedEmails.map(({ _id, email }) => (
                                  <li
                                    onClick={() => {
                                      setAttendees([
                                        ...attendees,
                                        { _id, email },
                                      ]);
                                      $("#attendees").val("");
                                      $("#attendees").focus();
                                    }}
                                  >
                                    {email}
                                  </li>
                                ))}
                            </ul>
                            {/* <div className="valid-feedback">
                              <i className="fas fa-check"></i> Full name is Okay
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
                          <div className="col-sm-10 col-12 ">
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
                          <div className="col-sm-10 col-12 ">
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
                              onClick={
                                meeting ? updateMeetingHandler : () => {}
                              }
                            >
                              {meeting ? "Update User" : "Ssve Meeting"}
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
