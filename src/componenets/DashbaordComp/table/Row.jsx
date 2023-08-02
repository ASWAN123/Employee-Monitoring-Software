import React from "react";
import { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useEffect } from "react";

function formatDuration(start_date, end_date) {
  const durationInMilliseconds =
    new Date(end_date * 1000) - new Date(start_date * 1000);
  const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((durationInMilliseconds % (1000 * 60)) / 1000);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const Row = ({ log }) => {
  let start_date = Math.min.apply(
    Math,
    log["data"].filter((x) => x.action == "clock in").map((x) => x.date)
  );

  let end_date = Math.max.apply(
    Math,
    log["data"].filter((x) => x.action == "clock out").map((x) => x.date)
  );

  const [details, setDetails] = useState(false);





  return (
    <>
      <tr class="hover:bg-gray-50 text-[14px] border-b ">
        <td className="px-6 py-2   whitespace-nowrap  ">{log.date}</td>
        <td className="px-6 py-2 whitespace-nowrap ">
          {new Date(start_date * 1000).toLocaleTimeString()}
        </td>
        <td className="px-6 py-2 whitespace-nowrap ">
          {new Date(end_date * 1000).toLocaleTimeString()}
        </td>
        <td className="px-6 py-2 whitespace-nowrap ">{formatDuration(start_date, end_date)}</td>
        <td
          className="px-6 py-2 whitespace-nowrap  hover:cursor-pointer "
          onClick={() => {
            setDetails(!details);
          }}
        >
          <CgDetailsMore size={24} />
        </td>
        <td className="px-6 py-2 whitespace-nowrap  text-right"></td>
      </tr>

      {details &&
        log.data.map((x, index) => {
          return (
            <tr class="hover:bg-gray-50 text-[14px] whitespace-nowrap  " key={index}>
              <td className="px-6 py-2  whitespace-nowrap  " > {index + 1} </td>
              <td className="px-6 py-2  whitespace-nowrap ">
                {x.action == "clock in"
                  ? new Date(x.date.seconds * 1000).toLocaleTimeString()
                  : "---"}
              </td>
              <td className="px-6 py-2  whitespace-nowrap">
                {x.action == "clock out"
                  ? new Date(x.date.seconds * 1000).toLocaleTimeString()
                  : "---"}
              </td>
              <td className="px-6 py-2  whitespace-nowrap">---</td>
              <td className="px-6 py-2  hover:cursor-pointer  capitalize "><span className= { x.action == 'clock in' ? "  rounded-full text-green-400 " : "  rounded-full text-red-400" }>{x.action}</span></td>
              <td className="px-6 py-2  whitespace-nowrap text-right text-blue-600 hover:cursor-pointer ">Report</td>
            </tr>
          );
        })}

    </>
  );
};
