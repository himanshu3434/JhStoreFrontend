import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuBox } from "react-icons/lu";
import AdminSideBarItems from "./AdminSideBarItems";
function AdminSideBar() {
  return (
    <div className="w-52  border-r-2   h-screen shadow-md space-y-4">
      <div>Hello Admin!</div>

      <div className=" ">
        <ul className="flex-col items-center justify-center space-y-3 ">
          <AdminSideBarItems Icon={LuLayoutDashboard} name="DashBoard" />
          <AdminSideBarItems Icon={VscGraph} name="Statistics" />
          <AdminSideBarItems Icon={FaRegUserCircle} name="Users" />
          <AdminSideBarItems Icon={MdOutlineInventory2} name="Inventory" />
          <AdminSideBarItems Icon={LuBox} name="Orders" />
        </ul>
      </div>
    </div>
  );
}

export default AdminSideBar;
