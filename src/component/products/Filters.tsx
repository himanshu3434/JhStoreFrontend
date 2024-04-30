import React from "react";

function Filters() {
  return (
    <div className="h-screen bg-blue-400 w-[17vw] ">
      <div>
        <h1>Filters</h1>
      </div>

      <hr className="my-5" />
      <div>
        <h1>Category</h1>
      </div>
      <select>
        <option value="">oppo vivo</option>

        <option
          value="
          "
        >
          realme
        </option>
      </select>
      <hr className="my-7" />

      <div>
        <div>Customer Review</div>
        <button>⭐⭐⭐⭐ & up</button>
        <button>⭐⭐⭐ & up</button>
        <button>⭐⭐ & up</button>
        <br />

        <button>⭐ & up</button>
      </div>
      <hr className="py-5" />

      <div>
        <div>Price Range</div>
        <div>min input</div>
        <div>max input</div>
      </div>
    </div>
  );
}

export default Filters;
