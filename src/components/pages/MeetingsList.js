import React from "react";
import { useSelector } from "react-redux";
import { permissionConstants } from "../../constants";
import Navbar from "../UI/Navbar";

const MeetingsList = () => {
  const auth = useSelector((state) => state.auth);
  const { permissions } = auth;

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
      <div>Meeting List</div>
    </>
  );
};

export default MeetingsList;
