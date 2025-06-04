import React, { useEffect } from 'react'
import DashboardLayout from '../DashboardLayout'
import Header from '@/components/shared/dashboard/Header'
import CreateEmployeeDialog from '@/components/shared/dashboard/employees/CreateEmployeeDialog'
import { useDispatch, useSelector } from 'react-redux';
import EmployeesList from '@/components/shared/dashboard/employees/EmployeesList';
import { fetchEmployees } from '@/store/employeesSlice';
import { toast } from 'sonner';

function EmployeesPage() {

  const dispatch = useDispatch();
  const {data: employees, loading, error} = useSelector((state) => state.employees)

  useEffect(() => {
    dispatch(fetchEmployees()).unwrap().catch((error) => toast.error("Error", {description: error}));
  }, [dispatch]);

  return (
    <DashboardLayout>
    <Header title="Employee Managment" subtitle="here us can  manage all users ">
       <CreateEmployeeDialog/>
    </Header>
    {loading ? (<p className="text-center text-red-500">loading employees...</p>) : error ? (<p className="text-center text-red-500">Failed to fetch employees</p>) : (
      <EmployeesList employees={employees} />
    )}
    </DashboardLayout>
  )
}
export default EmployeesPage














