import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
interface ItemType {
  name: string;
  Icon: IconType;
  to: string;
  selectedItem: string;
}
function AdminSideBarItems({ name, Icon, to, selectedItem }: ItemType) {
  const [requiredClasses, setRequiredClasses] = useState("");

  useEffect(() => {
    console.log("admin side bar item re render   ", selectedItem);
    setRequiredClasses(
      selectedItem === name
        ? "bg-gradient-to-r from-blue-300 to-blue-400 text-slate-100 "
        : ""
    );
  }, [selectedItem]);

  return (
    <li>
      <Link to={to}>
        <div
          className={`flex space-x-2 items-center hover:bg-gradient-to-r from-blue-300 to-blue-400  hover:text-slate-100 p-3 rounded-lg  ${requiredClasses}  `}
        >
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
