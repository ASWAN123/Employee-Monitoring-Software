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

export const Row = ({ logs }) => {
  let rowHeaders = ["Clock in", "Clock out", "Clock in", "Clock out"];

  return (
    <>
      {rowHeaders.map((x, index) => {
        return (
          <tr
            key={index}
            className="hover:bg-gray-50 py-2 text-[16px]  border-b "
          >
            <td>{x}</td>
          </tr>
        );
      })}
    </>
  );
};
