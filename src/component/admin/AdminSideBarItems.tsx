import { useEffect, useState } from "react";
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
    setRequiredClasses(
      selectedItem === name ? "bg-sky-500 text-white shadow-sm  " : ""
    );
  }, [selectedItem]);

  return (
    <li>
      <Link to={to}>
        <div
          className={`flex space-x-2 items-center hover:bg-sky-300 hover:text-white  p-3 rounded-lg  ${requiredClasses}  `}
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
