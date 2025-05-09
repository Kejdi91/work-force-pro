import React from 'react'
import StatsCard from './StatsCard'
import { DollarSign, Users, Activity, FileCheck } from "lucide-react"

const Stats = () => {
  return (
    <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6'>
        <StatsCard 
        label="Departments" 
        icon={<DollarSign size={22}/>} 
        stat="4500"
        />
        <StatsCard 
        label="Total Users" 
        icon={<Users size={22}/>} 
        stat="3890"
        />
        <StatsCard 
        label="Total Tasks" 
        icon={<Activity size={22}/>} 
        stat="3000"
        />
        <StatsCard 
        label="Tasks Done" 
        icon={<FileCheck size={22}/>} 
        stat="2500"
        />
    </div>
  )
}

export default Stats