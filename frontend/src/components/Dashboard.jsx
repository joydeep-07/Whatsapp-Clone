import React from 'react'
import SidePanel from './SidePanel'

const Dashboard = () => {
  return (
    <div className='flex'>
      <div className="left border h-screen w-1/4 ">
      <SidePanel/>
      </div>
      <div className="right border h-screen w-3/4 "></div>
    </div>
  )
}

export default Dashboard