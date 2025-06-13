import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";

const EditEmployeeDepartment = ({
  userId,
  currentDepartmentName,
  departments = [], // ✅ Prevent undefined
  onDepartmentUpdated,
  loading,
  error,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState(currentDepartmentName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedDepartment(currentDepartmentName);
  }, [currentDepartmentName]);

  const handleDepartmentChange = async (newDepartmentName) => {
    setIsSubmitting(true);
    try {
      const department = departments.find((dept) => dept.name === newDepartmentName);
      const newDepartmentId = department?.id;

      if (!newDepartmentId) {
        throw new Error("Invalid department");
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/employees/update-department`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            user_id: userId,
            department_id: newDepartmentId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update department");
      }

      setSelectedDepartment(newDepartmentName);
      onDepartmentUpdated(userId, newDepartmentId);

      toast.success("Success", {
        description: "Employee’s department updated successfully.",
      });
    } catch (error) {
      toast.error("Error", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <p className="text-red-500">Error while fetching departments: {error}</p>;
  }

  return (
    <Select
      value={selectedDepartment}
      onValueChange={handleDepartmentChange}
      disabled={loading || isSubmitting}
    >
      <SelectTrigger className="h-5 w-fit font-medium">
        <SelectValue placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent>
        {departments.length > 0 &&
          departments.map((dept) => (
            <SelectItem key={dept.id} value={dept.name}>
              {dept.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default EditEmployeeDepartment;
