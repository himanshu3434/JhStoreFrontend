import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
interface ItemType {
  name: string;
  Icon: IconType;
  to: string;
}
function AdminSideBarItems({ name, Icon, to }: ItemType) {
  return (
    <li>
      <Link to={to}>
        <div className="flex space-x-2 items-center hover:bg-gradient-to-r from-blue-300 to-blue-400  hover:text-blue-800  ">
          <div>
            <Icon />
          </div>
          <span>{name}</span>
        </div>
      </Link>
    </li>
  );
}

export default AdminSideBarItems;
