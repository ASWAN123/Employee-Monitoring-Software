import React from 'react'

const Loading = () => {
  return (
    <div class="absolute  w-full h-screen border z-11 top-0 bg-blue-950/80 flex justify-center items-center ">
  <div class=" p-8 flex flex-col items-center shadow-lg rounded-lg">

    <div class="flex  space-x-4 mb-4">
      <img class="barcode-image w-[200px] h-[180px]  invert rounded animate-pulse" src='./images/barcode.png' />

    </div>

    <p class="text-center text-black text-xl bg-blue-500 px-4  py-2 rounded-full  ">Generating QR code ...</p>
  </div>
</div>
  )
}

export default Loading