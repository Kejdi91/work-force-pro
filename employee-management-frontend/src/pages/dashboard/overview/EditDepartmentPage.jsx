import React from 'react'
import DashboardLayout from '../DashboardLayout'
import Header from '../../../components/shared/dashboard/Header'
import EditDepartmentCard from '../../../components/shared/dashboard/department/EditDepartmentCard'
import DepartmentEmployees from '../../../components/shared/dashboard/department/DepartmentEmployees'

const EditDepartmentPage = () => {
  return (
    <DashboardLayout>
        <Header
        title="Department Details" 
        subtitle="Here you can edit departments name and asign or remove employyes from this department"
        />
            <div className='flex lg:flex-row flex-col gap-5'>
                <div>
                <EditDepartmentCard/>
                </div>
                <div className='w-full h-screen'>
                <DepartmentEmployees/>
                </div>
            </div>
    </DashboardLayout>
  )
}

export default EditDepartmentPage