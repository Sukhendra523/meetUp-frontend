import React from "react";
import Navbar from "../UI/Navbar";

const MeetingsList = () => {
  const search = () => {};
  return (
    <>
      <Navbar
        form={{
          link: "meeting/create",
          button: "Create meeting",
          search,
          placeholder: "Search Meeting",
        }}
      />
      <div>Meeting List</div>
    </>
  );
};

export default MeetingsList;
