import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import UserStats from './UserStats';
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDMain = () => {
    const {user} = useSelector((state) => state.auth);
    const {data:stats,error,isLoading} = useGetUserStatsQuery(user?.email);
    console.log(stats);
    if(isLoading) return <div className='text-center text-gray-500'>Loading..</div>
    if(!stats){
        return <div className='text-center'>No data available</div>
    }
    const data ={
        labels:['Total Payments','Total Reviews','Total Purchased Products'],
        datasets:[
            {
                label:'User stats',
                data:[stats.totalPayments,stats.totalReviews * 100, stats.totalPurchasedProducts * 100],
                backgroundColor:'rgba(75,192,192,0.2)',
                borderColor:'rgba(75,192,192,1)',
                borderWidth:1,
            }
        ]
    }

    const options = {
         options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
      callbacks:{
        label:function(tooltipItem){
     
      return  `${tooltipItem.label}:${tooltipItem.raw}`
      //return `${tooltipItem.label}: ${tooltipItem.label === 'Total Payments' ? tooltipItem.raw : tooltipItem.raw / 100}`;
        }
      }
      }
    }
    }
}


  return (
    <div className='p-6  h-200px bg-red'>
    <div>
        <h2 className='text-2xl font-semibold mb-4'>User Dashboard</h2>
        <p className='text-gray-500'>Hi, {user?.username || user?.email}! Welcome to our user dashboard</p>
    </div>
    <UserStats stats={stats}/>
    <div className='mb-6'>
        <Bar data={data} options={options}/>
    </div>
    </div>
  )
}

export default UserDMain;