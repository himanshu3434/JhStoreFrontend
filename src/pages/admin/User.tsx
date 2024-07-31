import React, { useEffect, useState } from "react";
import AdminSideBar from "../../component/admin/AdminSideBar";
import { fetchAllUsers } from "../../api/userApi";
import { Iuser } from "../../types/types";

function User() {
  const [allUser, setAllUser] = useState<Iuser[]>([]);
  const getAllUsers = async () => {
    const result = await fetchAllUsers(1);
    if (result.data.success === true) {
      setAllUser(result.data.data);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="flex">
      <div>
        <AdminSideBar />
      </div>
      <div>
        <table className=" table-fixed w-full text-center  border-seperate ">
          <thead className="text-xl border-b  border-gray-600 h-[9vh]">
            <tr>
              <th className=""> Name</th>

              <th className="">Email</th>

              <th className="">Gender</th>
              <th className="">Role</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {allUser.length > 0 &&
              allUser.map((data, index) => {
                // Option 1: Format the date according to your preferred locale (e.g., IST)

                return (
                  <tr
                    className={
                      index % 2 !== 0
                        ? `bg-[#706666] text-white h-[3em] `
                        : "h-[3em]"
                    }
                    key={data._id}
                  >
                    <td>{data.fullName}</td>

                    <td>{data.email}</td>

                    <td>{data.gender}</td>
                    <td>{data.role.toUpperCase()}</td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
