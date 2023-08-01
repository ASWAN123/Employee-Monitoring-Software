import React from "react";

const THead = () => {
  return (
    <tr>
      <th scope="col" className="px-6 py-2">
        Date
      </th>
      <th scope="col" className="px-6 py-2">
        Started
      </th>
      <th scope="col" className="px-6 py-2">
        Ended
      </th>
      <th scope="col" className="px-6 py-2">
        Duration
      </th>
      <th scope="col" className="px-6 py-2">
        Details
      </th>
      <th scope="col" className="px-6 py-2">
        <span className="sr-only">Report</span>
      </th>
    </tr>
  );
};

export default THead;
