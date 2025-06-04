import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import EditEmployeeDepartment from "./EditEmployeeDepartment";

export const EmployeesList = ({ employees }) => {
  const [updatedEmployees, setUpdatedEmployees] = useState(employees);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/departments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch departments.");
        }

        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        toast.error("Failed to fetch departments", {
          description: error.message,
        });
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentUpdated = (userId, newDepartmentId) => {
    setUpdatedEmployees((prev) =>
      prev.map((emp) =>
        emp.user_id === userId
          ? {
              ...emp,
              department_id: newDepartmentId,
              department_name:
                departments.find((dept) => dept.id === Number(newDepartmentId))
                  ?.name || "Unknown",
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
              <TableRow key={employee.user_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{employee.user_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department_name || "Unassigned"}</TableCell>
                <TableCell>
                  <EditEmployeeDepartment
                    userId={employee.user_id}
                    currentDepartment={employee.department_name}
                    departs={departments}
                    onDepartmentUpdated={handleDepartmentUpdated}
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
