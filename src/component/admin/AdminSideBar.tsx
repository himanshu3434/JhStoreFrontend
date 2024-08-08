import { FaRegUserCircle } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";

import AdminSideBarItems from "./AdminSideBarItems";
type AdminSideBarProps = {
  selectedItem: string;
};
function AdminSideBar({ selectedItem }: AdminSideBarProps) {
  return (
    <div className="w-44  border-r-2  text-2xl  h-screen shadow-md space-y-4 flex flex-col items-center">
      <div>Hello Admin!</div>

      <div className=" ">
        <ul className="flex-col items-center justify-center space-y-3 ">
          <AdminSideBarItems
            Icon={FaRegUserCircle}
            name="Users"
            to="/admin/users"
            selectedItem={selectedItem}
          />

          <AdminSideBarItems
            Icon={MdOutlineInventory2}
            name="Inventory"
            to="/admin/inventory"
            selectedItem={selectedItem}
          />

          <AdminSideBarItems
            Icon={LuBox}
            name="Orders"
            to="/admin/orders"
            selectedItem={selectedItem}
          />
        </ul>
      </div>
    </div>
  );
}

export default AdminSideBar;
