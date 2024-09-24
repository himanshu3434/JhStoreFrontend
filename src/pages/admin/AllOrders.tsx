import { useEffect, useState } from "react";
import { fetchAllOrders } from "../../api/orderApi";
import AdminSideBar from "../../component/admin/AdminSideBar";
import Pagination from "../../component/Pagination";
import { IOrderAndOrderItems } from "../../types/types";

function AllOrders() {
  const [allOrders, setAllOrders] = useState<IOrderAndOrderItems[]>([]);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [page, setPage] = useState(1);
  const getAllOrders = async () => {
    const allOrdersResponse = await fetchAllOrders(page);

    if (allOrdersResponse.data.success === true) {
      setTotalPageNumber(allOrdersResponse.data.data.totalPageNumber);

      setAllOrders(allOrdersResponse.data.data.OrdersDetails);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, [page]);
  return (
    <div className="flex">
      <div>
        <AdminSideBar selectedItem="Orders" />
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
                        ? `bg-slate-100  h-[3em] text-sm `
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

        {totalPageNumber > 1 ? (
          <div>
            <Pagination page={page} setPage={setPage} total={totalPageNumber} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AllOrders;
