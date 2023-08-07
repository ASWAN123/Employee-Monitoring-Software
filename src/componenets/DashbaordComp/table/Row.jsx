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
  let rowHeaders = ['Clock in' , 'Clock out' , 'Clock in' ,  'Clock out']

  let filteredData  ;


  let x = logs.map(x => x.Clocktimes )
  let y = x.map(w => w.map(z => Object.values(z)).flat() ) // 7

  
  

  return (
    <>
      {
        rowHeaders.map((x , p)  => {
          return <tr key={p}>
            <td>{x}</td>
            {
              y.map((w ,  index) => {
                return <td key={index} >{ w.at(p) !== '' ? new Date(w.at(p).seconds * 1000).toLocaleTimeString('en-US') : '---'  }</td>
              })
            }

          </tr>
        })
      }

    </>
  );
};
