import React from "react";

export const Row = ({log}) => {
  console.log(new Date(log.date.seconds).toDateString())
  console.log(log.date.seconds)
  return (
    <tr class="hover:bg-gray-50 text-[15px]">
      <td class="px-6 py-2  text-gray-900 whitespace-nowrap ">
        {new Date(log.date.seconds *  1000).toDateString()}
        
      </td>
      <td class="px-6 py-2">{}</td>
      <td class="px-6 py-2">{}</td>
      <td class="px-6 py-2">{}</td>
      <td class="px-6 py-2">{}</td>
      <td class="px-6 py-2 text-right">
        <a href="#" class=" text-blue-600  hover:underline">
          Report
        </a>
      </td>
    </tr>
  );
};
