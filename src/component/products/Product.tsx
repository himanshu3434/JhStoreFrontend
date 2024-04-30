import React from "react";
import { NavLink } from "react-router-dom";
function Product() {
  return (
    <div>
      <div className="bg-blue-300 text-center">
        <NavLink to="/admin" className="">
          <img src="/dummy.webp" alt="" />
          <div>Narzo N53 4gb 65gb</div>
          <div>⭐</div>
          <div>₹5000</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Product;
