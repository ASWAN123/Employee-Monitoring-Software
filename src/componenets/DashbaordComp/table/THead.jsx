import React from "react";

const THead = () => {
  return (
    <tr>
      <th scope="col" className="px-6 py-2 min-w-[170px] max-w-[170px]  ">
        Date
      </th>
      <th scope="col" className="px-6 py-2 min-w-[170px] max-w-[170px]  ">
        Clock in
      </th>
      <th scope="col" className="px-6 py-2 min-w-[170px] max-w-[170px]  ">
        Clock out
      </th>
      <th scope="col" className="px-6 py-2 min-w-[170px] max-w-[170px]  ">
        Duration
      </th>
      <th scope="col" className="px-6 py-2 min-w-[170px] max-w-[170px]  ">
        Details
      </th>
      <th scope="col" className="px-6 py-2 min-w-[170px] max-w-[170px]  ">
        <span className="sr-only">Report</span>
      </th>
    </tr>
  );
};

export default THead;
