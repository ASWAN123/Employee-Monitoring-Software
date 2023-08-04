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

  console.log(log)

  // console.log(log.date)

  return (
    <>
      <tr className="hover:bg-gray-50 text-[14px] border-b ">
        
      </tr>

      {/* {details &&
        log.data.map((x, index) => {
          return (
            <tr class="hover:bg-gray-50 text-[14px] whitespace-nowrap  " key={index}>
            </tr>
          );
        })} */}

    </>
  );
};
