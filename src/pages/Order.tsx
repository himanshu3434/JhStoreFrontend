import React, { useEffect, useState } from "react";
import { getAllUserOrders } from "../api/orderApi";
import { IOrder } from "../types/types";
import { GiConsoleController } from "react-icons/gi";
import { set } from "react-hook-form";

function Order() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const fetchOrders = async () => {
    const fetchOrdersResponse = await getAllUserOrders();

    if (fetchOrdersResponse.data.success) {
      console.log("orders user   ", fetchOrdersResponse.data.data);
      setOrders(fetchOrdersResponse.data.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className=" text-slate-300 h-[100vh]">
      <div className=" text-center text-4xl my-10 text-black font-bold">
        Your Orders
      </div>

      <div>
        <table className=" table-fixed w-full text-center  border-seperate ">
          <thead className="text-xl border-b  border-gray-600 h-[9vh]">
            <tr>
              <th className="">Order Id</th>

              <th className="">Date</th>
              <th className="">Status</th>
              <th className="">Amount</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {orders &&
              orders.map((data, index) => {
                const mongodbDate = new Date(data.createdAt);

                // Option 1: Format the date according to your preferred locale (e.g., IST)
                const formattedDate = mongodbDate.toLocaleString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <tr
                    className={
                      index % 2 !== 0 ? `bg-gray-200  h-[3em]  ` : "h-[3em]"
                    }
                    key={data._id}
                  >
                    <td>{data._id}</td>

                    <td>{formattedDate}</td>
                    <td>{data.status}</td>
                    <td>{data.orderAmount}</td>
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

export default Order;
