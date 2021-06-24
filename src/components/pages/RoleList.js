import React from "react";
import Navbar from "../UI/Navbar";

const RoleList = () => {
  return (
    <>
      <Navbar form={{ link: "role/create", button: "Create Role" }} />
      <div>Manage Roles</div>
    </>
  );
};

export default RoleList;
