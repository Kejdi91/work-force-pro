import { useEffect,useState } from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "sonner";
import { set } from 'zod';


const EditEmployeeDepartment = ({userId,currentDepartmentName,departments,onDepartmentUpdated}) => {
  const [selectedDepartment, setSelectedDepartment] = useState(currentDepartmentName);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
        setSelectedDepartment(currentDepartmentName);
  },[currentDepartmentName]);

    const handleDepartmentChange = async (newDepartmentName) => {
        setLoading(true);
        try {
            const department = departments.find(
                (dept) => dept.name === newDepartmentName
            );
            const newDepartmentId = department ? department.id : null;

            if(!newDepartmentId){
                throw new Error("Invalid department")
            }

            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/employees/update-department`,
                {
                    method: "PUT",
                    headers: {
                        "Content-type" : "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },body: JSON.stringify({
                        user_id:userId,
                        department_id: newDepartmentId,
                }),
            }
        );

        if(!response.ok){
            throw new Error ("Failed to update department");
        }

        setSelectedDepartment(newDepartmentName);
        onDepartmentUpdated(userId, newDepartmentId);

        toast.success("Success", {description:"Employye`s department updated successfully."});
        } catch (error) {
            toast.error("Error",{description:error.message})
        }finally {
            setLoading(false);
        }
    };

  return (
  <Select value={selectedDepartment} 
          onValueChange={handleDepartmentChange} 
          disabled={loading}>
        
        <SelectTrigger classname="h-5 w-fit font-medium">
            <SelectValue placeholder={selectedDepartment || "Unasigned"}/>
        </SelectTrigger>

        <SelectContent>
            {departments.map((dept) => (
                <SelectItem key={dept.if} value={dept.mame}>
                    {dept.name}
                </SelectItem>
            ))}
        </SelectContent>
  </Select>
  );
};

export default EditEmployeeDepartment