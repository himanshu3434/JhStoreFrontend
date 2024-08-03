import React, { useEffect, useState } from "react";
import AdminSideBar from "../../component/admin/AdminSideBar";
import { IOrderAndOrderItems } from "../../types/types";
import { fetchAllOrders } from "../../api/orderApi";

function AllOrders() {
  const [allOrders, setAllOrders] = useState<IOrderAndOrderItems[]>([]);
  const getAllOrders = async () => {
    const allOrdersResponse = await fetchAllOrders(1);
    if (allOrdersResponse.data.success === true) {
      console.log("all order data ", allOrdersResponse.data.data);
      setAllOrders(allOrdersResponse.data.data);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div className="flex">
      <div>
        <AdminSideBar />
      </div>
      <div>
        <table className=" table-fixed w-full text-center  border-seperate ">
          <thead className="text-lg border-b  border-gray-600 h-[9vh]">
            <tr>
              <th className=""> OrderId</th>

              <th className="">Customer</th>

              <th className="">Quantity</th>
              <th className="">Amount</th>
              <th className="">Status</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {allOrders.length > 0 &&
              allOrders.map((data, index) => {
                // Option 1: Format the date according to your preferred locale (e.g., IST)

                return (
                  <tr
                    className={
                      index % 2 !== 0
                        ? `bg-[#706666] text-white h-[3em] text-sm `
                        : "h-[3em] text-sm"
                    }
                    key={data._id}
                  >
                    <td>{data._id}</td>

                    <td>{data.fullName}</td>

                    <td>{data.quantity}</td>
                    <td>{data.orderAmount}</td>
                    <td>{data.status.toUpperCase()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllOrders;
