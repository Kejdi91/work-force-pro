import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const DepartmentEmployees = () => {
  const { id: selectedDepartmentId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [employeeRes, departmentsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/employees/departement/${selectedDepartmentId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${import.meta.env.VITE_BASE_URL}/departments`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);
        
        if (!employeeRes.ok) throw new Error("Failed to fetch employees");
        const employeesData = await employeeRes.json();
        const departmentsData = await departmentsRes.json();
        setEmployees(Array.isArray(employeesData) ? employeesData : []);
        setDepartments(Array.isArray(departmentsData) ? departmentsData : []);
      } catch (error) {
        toast.error("Error", { description: error.message });
        setEmployees([]);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedDepartmentId]);
  const handleDepartmentChange = async (userId, newDepartmentId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/employees/update-department`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id: userId, // :white_tick: corrected key
        department_id: newDepartmentId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update department");
    }
    toast.success("Success", {
      description: "Employee department updated successfully",
    });
    // :white_tick: Update the employee locally
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.user_id === userId ? { ...emp, department_id: newDepartmentId } : emp
      )
    );
  } catch (error) {
    toast.error("Error", {
      description: error.message,
      variant: "destructive",
    });
  }
};
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees by Department</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : employees.length === 0 ? (
          <p className="text-gray-500">No employees found in this department.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{employee.user_name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={String(selectedDepartmentId)}
                      onValueChange={(value) => handleDepartmentChange(employee.user_id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={String(dept.id)}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
export default DepartmentEmployees;






