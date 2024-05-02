import React from "react";
import { NavLink } from "react-router-dom";
function Product() {
  return (
    <div>
      <div className="bg-gray-300 text-center w-[20vw]">
        <NavLink to="/admin" className="">
          <img src="/dummy.webp" alt="" />
          <div>Narzo N53 4gb 65gb</div>
          <div>3.5 |⭐ (3000)</div>
          <div>₹5000</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Product;
