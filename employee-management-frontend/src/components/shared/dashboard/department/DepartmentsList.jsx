import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil,  } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '@/store/departmentsSlice';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const DepartmentsList = ({ isListView }) => {
  const dispatch = useDispatch();
  const { departments, loading, error } = useSelector((state) => state.departments);
 
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
  
  const handleDepartmentDeleted = () => {
    dispatch(fetchDepartments());
  }
  
  if (loading) {
    return <p>Loading departments...</p>;
  }
  
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }
  
  if (departments.length === 0) {
    return <p>No departments found.</p>;
  }
  
  return (
    <div>
      { isListView  ?  (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
<TableBody>
  {departments.map((department) => (
    <TableRow key={department.id}>
      <TableCell className="font-medium capitalize">
        {department.name}
      </TableCell>
      <TableCell>{department.employee_count || 0}</TableCell>
      <TableCell className="text-right flex justify-end gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to={`/edit-department/${department.id}`}>
            <Pencil />
          </Link>
        </Button>
          <DeleteButton departmentId= {department.id} departmentName={department.name} onDeleted={handleDepartmentDeleted} />
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h2 className="text-lg font-bold capitalize mb-2">
                {dept.name}
              </h2>
              <p className="text-gray-500 mb-4">
                Employees: {dept.employee_count || 0}
              </p>
              <div className="flex justify-end gap-2">
                <Link to={`/edit-department/${dept.id}`}>
                  <Button variant="outline" size="sm">
                    <Pencil />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DepartmentsList;