import React from "react";

const THead = ({ logs }) => {
  // default peer week  , 14 days , 30 day  ,  to  range
  const numberofdays = [...Array(7 - logs.length).keys()];

  return (
    <tr>
      <th scope="col" className="px-6 py-2 min-w-[170px] max-w-[170px]  "></th>

      {logs.map((x) => {
        return (
          <th
            key={x.date}
            scope="col"
            className="px-6 py-2 min-w-[120px] max-w-[120px] border "
          >
            {new Date(x.date).toLocaleDateString("en-GB")}
          </th>
        );
      })}

      {numberofdays.map((x) => {
        return (
          <th
            key={x}
            scope="col"
            className="px-6 py-2 min-w-[120px] max-w-[120px] border "
          >
            {new Date(logs.at(-1).date + 86400000 * (x + 1)).toLocaleDateString(
              "en-GB"
            )}
          </th>
        );
      })}
    </tr>
  );
};

export default THead;
