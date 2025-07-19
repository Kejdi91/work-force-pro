import React, {useState} from 'react'
import DashboardLayout from '../DashboardLayout'
import Header from '../../../components/shared/dashboard/Header'
import CreateDepartmentDialog from '../../../components/shared/dashboard/department/CreateDepartmentDialog'
import Stats from '@/components/shared/dashboard/stats/Stats'

import {Button} from "@/components/ui/button"
import { LayoutDashboard, ListTodo } from 'lucide-react'
import DepartmentsList from '../../../components/shared/dashboard/department/DepartmentsList'

const OverviewPage = () => {
  const [isListView, setIsListView] = useState(true);
  return (
    <DashboardLayout>
    <Header title="Dashboard" subtitle="Here you can manage all the departments, users and tasks.">
      <CreateDepartmentDialog/>
    </Header>
    <Stats/>

    <div className='mt-10'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold mb-4'>
          List of all Departments
        </h1>
        <div className='flex flex-nowrap space-x-2'>
            <Button
                variant={isListView ? "" : "outline"}
                size="icon"
                onClick={() => setIsListView(true)}
                >
              <ListTodo/>
            </Button>
            <Button
            variant={isListView ? "outline" : ""}
            size="icon"
            onClick={() => setIsListView(false)}
            >
              <LayoutDashboard/>
            </Button>
        </div>
      </div>
      <DepartmentsList isListView={isListView}/>
    </div>
   </DashboardLayout>
  );
};

export default OverviewPage