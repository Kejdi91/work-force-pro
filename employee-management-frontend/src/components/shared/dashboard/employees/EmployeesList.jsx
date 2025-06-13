import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditEmployeeDepartment from "./EditEmployeeDepartment";

export const EmployeesList = ({ employees, departments = [], loading, error }) => {
  const [updatedEmployees, setUpdatedEmployees] = useState(employees || []);

  const handleDepartmentUpdated = (userId, newDepartmentId) => {
    setUpdatedEmployees((prev) =>
      prev.map((emp) =>
        emp.user_id === userId
          ? {
              ...emp,
              department_id: newDepartmentId,
              department_name:
                departments.find((dept) => dept.id === Number(newDepartmentId))?.name || "Unknown",
            }
          : emp
      )
    );
  };

  return (
    <>
      {updatedEmployees.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {updatedEmployees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{employee.user_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department_name || "Unassigned"}</TableCell>
                <TableCell>
                  <EditEmployeeDepartment
                    userId={employee.user_id}
                    currentDepartmentName={employee.department_name}
                    departments={departments}
                    onDepartmentUpdated={handleDepartmentUpdated}
                    loading={loading}
                    error={error}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No employees found.</p>
      )}
    </>
  );
};

export default EmployeesList;
