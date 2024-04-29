import React from "react";
import { IconType } from "react-icons";
interface ItemType {
  name: string;
  Icon: IconType;
}
function AdminSideBarItems({ name, Icon }: ItemType) {
  return (
    <li className="flex space-x-2 items-center hover:bg-gradient-to-r from-blue-300 to-blue-400  hover:text-blue-800  ">
      <div>
        <Icon />
      </div>
      <span>{name}</span>
    </li>
  );
}

export default AdminSideBarItems;
