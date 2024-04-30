import React, { lazy } from "react";
import AdminSideBar from "../../component/admin/AdminSideBar";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function Admin() {
  return (
    <>
      <div>
        <div className=" flex">
          <AdminSideBar />
        </div>
      </div>
    </>
  );
}

export default Admin;
