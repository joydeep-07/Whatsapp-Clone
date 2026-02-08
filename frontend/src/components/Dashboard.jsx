import React from 'react'
import SidePanel from './SidePanel'

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="left bg-[var(--bg-main)] h-screen w-1/4 ">
        <SidePanel />
      </div>
      <div className="right h-screen w-3/4 bg-[var(--bg-main)] "></div>
    </div>
  );
}

export default Dashboard