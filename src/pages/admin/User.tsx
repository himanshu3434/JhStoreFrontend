import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../api/userApi";
import AdminSideBar from "../../component/admin/AdminSideBar";
import Pagination from "../../component/Pagination";
import { Iuser } from "../../types/types";

function User() {
  const [allUser, setAllUser] = useState<Iuser[]>([]);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [page, setPage] = useState(1);
  const getAllUsers = async () => {
    const result = await fetchAllUsers(page);
    if (result.data.success === true) {
      setTotalPageNumber(result.data.data.totalPageNumber);
      setAllUser(result.data.data.users);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [page]);
  return (
    <div className="flex">
      <div>
        <AdminSideBar selectedItem="Users" />
      </div>
      <div>
        <table className=" table-fixed w-full text-center  border-seperate ">
          <thead className="text-xl border-b  border-gray-600 h-[9vh]">
            <tr>
              <th className=""> Name</th>

              <th className="">Email</th>

              <th className="">Gender</th>
              <th className="">Role</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {allUser.length > 0 &&
              allUser.map((data, index) => {
                // Option 1: Format the date according to your preferred locale (e.g., IST)

                return (
                  <tr
                    className={
                      index % 2 !== 0 ? `bg-gray-200  h-[3em] ` : "h-[3em]"
                    }
                    key={data._id}
                  >
                    <td>{data.fullName}</td>

                    <td>{data.email}</td>

                    <td>{data.gender}</td>
                    <td>{data.role.toUpperCase()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {totalPageNumber > 1 ? (
          <div>
            <Pagination page={page} setPage={setPage} total={totalPageNumber} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default User;
