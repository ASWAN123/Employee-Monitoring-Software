import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { contextData } from '../../ContextData'
import { Line } from 'react-chartjs-2';
// this  line look he  has nothing  to do  with this  compoennet but  actually  it's  important  for chat  js  to  work 
import Chart from 'chart.js/auto'

function millisecondsToDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}


const Mainpage = () => {
  const { auth, data } = useContext(contextData);
  const logs = data?.find((x) => x.id == auth.currentUser.uid)?.workTimesData;
  let [ mydata , setMyData ] =useState([])

  useEffect(() => {
    let container = []
    logs?.forEach((x ,  index) => {
      if (x.Clocktimes.length == 4){
        let x1 = x.Clocktimes[0].date
        let y1 = x.Clocktimes[1].date
        let x2 = x.Clocktimes[2].date
        let y2 = x.Clocktimes[3].date
  
        let firstdur = (y1 - x1 )
        let seconddur = (y2 - x2 )
        let totalWorkingH = firstdur + seconddur
        container.push({ id:index , totalworking: totalWorkingH , date: new Date(parseInt(x1)).setHours(0, 0, 0, 0)})
      }
      if(  x.Clocktimes.length  == 2 || x.Clocktimes.length  == 3 ){
        let x1 = x.Clocktimes[0].date 
        let y1 = x.Clocktimes[1].date 
        let firstdur = (y1 - x1 ) 
        let totalWorkingH = firstdur 
        container.push({ id:index , totalworking: totalWorkingH , date: new Date(parseInt(x1)).setHours(0, 0, 0, 0)})
      }
    })

    setMyData(container)


  } ,  [logs])





  let o = mydata.sort((x , y) => parseInt(x.date) - parseInt(y.date)  )

  const chartData = {
    labels: o.map(x => new Date(parseInt(x.date)).toLocaleDateString()),
    datasets: [
        {
          label: 'Working Hours' ,
          data: o.map(x => x.totalworking / (1000*60) /60 ) ,
          borderWidth: 1 ,
        }
    ]
  }
  




  return (
    <div className='w-full p-4 flex gap-4'>
        <div className='w-[80%]'>
        <h1 className='text-black  text-[18px] font-semibold '>Welcome to Dashboard Home!</h1>
        <Line
        data={chartData}
        
        options={{
          plugins: {
            title: {
              display: true,
              text: `Working time between ${ mydata.map(x => new Date(x.date).toLocaleDateString())[0] } - ${ mydata.map(x => new Date(x.date).toLocaleDateString()).at(-1) } `
            }
          },
          scales:{
            y: {
              title: {
                display: true,
                text: 'Hours'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Dates'
              }
            }
          }
          
        }}
      />

        </div>
        {/* <div className='w-[350px] border'>
          
        </div> */}
    </div>
  )
}

export default Mainpage