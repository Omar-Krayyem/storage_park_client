import './style.css';
import React from "react";
import PieChart from '../../../components/Admin/pieChart';
import Barchart from '../../../components/Admin/Barchart';
const PieData = [
    { name: 'Fashion', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 800 },
    { name: 'Group E', value: 400 },
    { name: 'Group F', value: 300 },
    { name: 'Group G', value: 300 },
    { name: 'Group H', value: 200 },
  ];

  const BarData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  

const Dashboard = () => {
    return (
        <div className='AdminDashboard_page'> 
                <div className='body'>
                <div className='title'><h1>Dashboard</h1></div>
                    <div className='records'>
                        <div className='record'>
                            <span>900</span>Requests
                        </div>
                        <div className='record'>
                            <span>290</span>Partners
                        </div>
                        <div className='record'>
                            <span>350</span>Workers
                        </div>
                    </div>
                    <div className='graphs'>
                        <div className='pieChart'>
                            <h2>Stored Product Categories</h2>
                            <PieChart data={PieData} width={1200} height={1200} />
                        </div>
                        <div className='barChart'>
                            <h2>Numbers of Orders</h2>
                            <Barchart data={BarData}/>
                        </div>

                    </div>
                </div>
        </div>
    );
}

export default Dashboard;